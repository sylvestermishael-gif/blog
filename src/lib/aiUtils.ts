/**
 * Safely parses JSON from a string that might contain markdown backticks or other junk content.
 */
export function extractAndParseJSON<T>(text: string): T {
  if (!text) {
    throw new Error("Empty response from model");
  }

  // Helper to clean common JSON issues like trailing commas or single quotes if they creep in
  const basicClean = (s: string) => {
    return s.trim()
      .replace(/,\s*([}\]])/g, '$1') // Remove trailing commas
      .replace(/([{,]\s*)([a-zA-Z0-9_]+):/g, '$1"$2":'); // Ensure keys are quoted if they aren't
  };

  try {
    // 1. Try direct parse
    return JSON.parse(text) as T;
  } catch (e) {
    // 2. Try to find the first '{' and last '}' - this is usually the most robust for AI content
    const startIndex = text.indexOf('{');
    const endIndex = text.lastIndexOf('}');
    
    if (startIndex !== -1 && endIndex !== -1 && endIndex > startIndex) {
      const maybeJson = text.substring(startIndex, endIndex + 1);
      try {
        return JSON.parse(maybeJson) as T;
      } catch (innerE) {
        try {
          // Try one more time with basic cleaning for common AI hallucination characters
          const cleaned = basicClean(maybeJson);
          return JSON.parse(cleaned) as T;
        } catch (cleanE) {
           console.warn("Failed to parse bracketed JSON string even after cleaning", cleanE);
        }
      }
    }

    // 3. Last ditch: try to extract from markdown blocks specifically
    const jsonMatch = text.match(/```json\n?([\s\S]*?)\n?```/);
    if (jsonMatch && jsonMatch[1]) {
      const rawBlock = jsonMatch[1].trim();
      try {
        return JSON.parse(rawBlock) as T;
      } catch (innerE) {
        try {
          return JSON.parse(basicClean(rawBlock)) as T;
        } catch (cleanE) {
          console.warn("Failed last-ditch extraction attempt", cleanE);
        }
      }
    }

    console.error("FAILED JSON EXTRACTION FROM TEXT:", text);
    throw new Error("Synchronizing signals... Signal format incompatible.");
  }
}
