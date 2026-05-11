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
    // 2. Try to extract from markdown blocks
    const jsonMatch = text.match(/```json\n?([\s\S]*?)\n?```/);
    if (jsonMatch && jsonMatch[1]) {
      const rawBlock = jsonMatch[1].trim();
      try {
        return JSON.parse(rawBlock) as T;
      } catch (innerE) {
        try {
          return JSON.parse(basicClean(rawBlock)) as T;
        } catch (cleanE) {
          console.warn("Failed to parse extracted JSON block even after cleaning", cleanE);
        }
      }
    }

    // 3. Try to find the first '{' and last '}'
    const startIndex = text.indexOf('{');
    const endIndex = text.lastIndexOf('}');
    
    if (startIndex !== -1 && endIndex !== -1) {
      const maybeJson = text.substring(startIndex, endIndex + 1);
      try {
        return JSON.parse(maybeJson) as T;
      } catch (innerE) {
        try {
          return JSON.parse(basicClean(maybeJson)) as T;
        } catch (cleanE) {
          console.warn("Failed to parse bracketed JSON string even after cleaning", cleanE);
        }
      }
    }

    console.error("FAILED JSON EXTRACTION FROM TEXT:", text);
    throw new Error("Could not extract valid JSON from model response. Text was: " + text.substring(0, 100) + "...");
  }
}
