import { Post } from "../types";

export const mockPosts: Post[] = [
  {
    id: "1",
    title: "The Art of Minimalist UI: Less is Always More",
    summary: "Discover why the world's most successful products are stripping away the noise to focus on what truly matters to the user.",
    content: `
      <p>In a world of constant digital noise, minimalism isn't just a style choice; it's a necessity. We explore how leading designers are using whitespace and typography to create calmer, more effective user experiences.</p>
      <p>Minimalism in UI design is about more than just stripping away elements. It's about intentionality. Every pixel should serve a purpose, every interaction should feel natural, and every transition should guide the user seamlessly through the interface.</p>
      <h2>The Power of Whitespace</h2>
      <p>Whitespace is often misunderstood as 'empty space'. In reality, it's a powerful tool that gives your content room to breathe. It helps in grouping related elements and separating different sections of your app, making it more scannable and less overwhelming.</p>
      <h2>Typography as the Main Character</h2>
      <p>When you remove excessive decorations, typography takes center stage. Choosing the right typeface becomes critical. It's not just about legibility; it's about setting the tone and mood of the entire product.</p>
    `,
    category: "Inspiration",
    author: "Elena Rossi",
    authorId: "elena_rossi",
    date: "May 10, 2024",
    imageUrl: "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&q=80&w=2067",
    readTime: "5 min read",
    likes: 1240,
  },
  {
    id: "2",
    title: "Interview: Marcus Aurelius on Modern Web Architecture",
    summary: "The senior architect at Nebula discusses the future of distributed systems and why design thinking is key to technical success.",
    content: `
      <p>Marcus has been at the forefront of web architecture for over a decade. In this exclusive interview, he shares his insights on where the industry is heading and why the bridge between design and engineering is more important than ever.</p>
      <blockquote>"Architecture is the silent partner of design. If the structure doesn't support the vision, the vision will fail."</blockquote>
      <p>We discussed everything from the rise of serverless computing to the importance of building resilient, scalable systems that can handle the demands of today's globally distributed user base.</p>
    `,
    category: "Interviews",
    author: "James Chen",
    authorId: "james_chen",
    date: "May 8, 2024",
    imageUrl: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=2070",
    readTime: "12 min read",
    likes: 856,
  },
  {
    id: "3",
    title: "Breaking Into Product Design: A 2024 Guide",
    summary: "Everything you need to know about starting your career in design, from building a portfolio to mastering the core tools.",
    content: `
      <p>The path to becoming a product designer is rarely a straight line. Whether you're coming from a different background or just starting out, this guide will help you navigate the complex landscape of modern product design.</p>
      <h2>Build a Portfolio That Tells a Story</h2>
      <p>Your portfolio shouldn't just be a collection of pretty mockups. It should show your process. How did you solve the problem? What were the constraints? Why did you make the decisions you made?</p>
      <h2>Master the Right Tools</h2>
      <p>Figma is the industry standard, but it's not the only tool you need. Understanding the fundamentals of design, color theory, and typography is far more important than knowing every keyboard shortcut in a specific software.</p>
    `,
    category: "Career",
    author: "Sarah Jenkins",
    authorId: "sarah_jenkins",
    date: "May 5, 2024",
    imageUrl: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=2070",
    readTime: "8 min read",
    likes: 2103,
  },
  {
    id: "4",
    title: "Mastering Tailwind CSS: Beyond the Basics",
    summary: "Take your styling skills to the next level with advanced utility-first techniques for building responsive layouts.",
    content: `
      <p>Tailwind CSS has revolutionized how we think about styling. This tutorial dives deep into some of the more advanced features that will help you build complex, responsive interfaces with ease.</p>
      <h2>Customizing Your Theme</h2>
      <p>One of the most powerful features of Tailwind is its extensibility. We'll show you how to properly configure your tailwind.config.ts to match your brand's unique design system.</p>
      <h2>Advanced Responsive Patterns</h2>
      <p>Using container queries, complex grid layouts, and dynamic classes to ensure your site looks perfect on every screen size from mobile to ultra-wide monitors.</p>
    `,
    category: "Tutorials",
    author: "David Miller",
    authorId: "david_miller",
    date: "May 1, 2024",
    imageUrl: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?auto=format&fit=crop&q=80&w=2031",
    readTime: "15 min read",
    likes: 542,
  },
  {
    id: "5",
    title: "The Future of Design Systems in an AI Era",
    summary: "How artificial intelligence is changing the way we build, maintain, and scale design systems for global brands.",
    content: `
      <p>Design systems are evolving faster than ever. AI is now playing a significant role in automating repetitive tasks, allowing designers to focus on high-level strategic thinking.</p>
    `,
    category: "Inspiration",
    author: "Elena Rossi",
    authorId: "elena_rossi",
    date: "Apr 28, 2024",
    imageUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=2070",
    readTime: "7 min read",
    likes: 932,
  },
  {
    id: "6",
    title: "Designing for Accessibility: A Moral Imperative",
    summary: "Why inclusive design is not just a 'nice to have' but a fundamental requirement for any serious digital product.",
    content: `
      <p>Accessibility is often an afterthought in the design process. We argue that it should be at the core of everything we build.</p>
    `,
    category: "Career",
    author: "Marcus Aurelius",
    authorId: "marcus_aurelius",
    date: "Apr 22, 2024",
    imageUrl: "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&q=80&w=1974",
    readTime: "10 min read",
    likes: 1567,
  },
  {
    id: "7",
    title: "Visual Storytelling in Digital Products",
    summary: "How to use imagery, motion, and layout to tell a compelling story that resonates with your users.",
    content: `
      <p>Every interaction is an opportunity for storytelling. This article explores techniques for weaving narratives into your digital products.</p>
    `,
    category: "Inspiration",
    author: "James Chen",
    authorId: "james_chen",
    date: "Apr 15, 2024",
    imageUrl: "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=1964",
    readTime: "6 min read",
    likes: 2891,
  },
  {
    id: "8",
    title: "The Subtle Science of Color Psychology",
    summary: "Understanding how color choices impact user behavior, trust, and conversion rates in modern UI design.",
    content: `
      <p>Color is one of the most powerful tools in a designer's arsenal. It can evoke emotions, guide attention, and influence decision-making processes subconsciously.</p>
    `,
    category: "Tutorials",
    author: "Sarah Jenkins",
    authorId: "sarah_jenkins",
    date: "Apr 10, 2024",
    imageUrl: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&q=80&w=2070",
    readTime: "9 min read",
    likes: 3122,
  },
  {
    id: "9",
    title: "Sustainable Web Design: Reducing Our Digital Footprint",
    summary: "Practical tips for building eco-friendly websites that are both beautiful and energy-efficient.",
    content: `
      <p>The internet consumes a massive amount of energy. As designers and developers, we have a responsibility to minimize the environmental impact of the products we create.</p>
    `,
    category: "Inspiration",
    author: "David Miller",
    authorId: "david_miller",
    date: "Apr 5, 2024",
    imageUrl: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&q=80&w=2070",
    readTime: "11 min read",
    likes: 745,
  },
  {
    id: "10",
    title: "Navigating Remote Design Teams",
    summary: "Strategies and tools for maintaining creative collaboration and high team morale in a distributed work environment.",
    content: `
      <p>Remote work is here to stay, but it presents unique challenges for creative teams.</p>
    `,
    category: "Career",
    author: "Elena Rossi",
    authorId: "elena_rossi",
    date: "Mar 30, 2024",
    imageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=2070",
    readTime: "8 min read",
    likes: 1342,
  },
  {
    id: "11",
    title: "The Rise of Neo-Brutalism in 2024",
    summary: "Why designers are embracing raw, unpolished aesthetics and bold typography to stand out in a sea of soft gradients.",
    content: `
      <p>Neo-brutalism is a reaction against the overly polished, 'safe' design trends of the last decade. It's loud, it's unapologetic, and it's taking the web by storm.</p>
    `,
    category: "Inspiration",
    author: "James Chen",
    authorId: "james_chen",
    date: "Mar 25, 2024",
    imageUrl: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=2070",
    readTime: "7 min read",
    likes: 4102,
  },
  {
    id: "12",
    title: "Mastering Figma's Auto-Layout 5.0",
    summary: "Everything you need to know about the latest updates to Figma's most powerful layout tool.",
    content: `
      <p>Auto-layout is the backbone of any serious Figma component library. We'll show you the pro-tips for building truly responsive components that behave like real code.</p>
    `,
    category: "Tutorials",
    author: "Sarah Jenkins",
    authorId: "sarah_jenkins",
    date: "Mar 20, 2024",
    imageUrl: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&q=80&w=1974",
    readTime: "14 min read",
    likes: 2154,
  },
  {
    id: "13",
    title: "Life as a Solo Design Founder",
    summary: "The highs and lows of building a design-first SaaS business from scratch without a co-founder.",
    content: `
      <p>Building a business alone is a marathon of self-discipline. We talk to founders who have successfully navigated the transition from designer to entrepreneur.</p>
    `,
    category: "Career",
    author: "David Miller",
    authorId: "david_miller",
    date: "Mar 15, 2024",
    imageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=2072",
    readTime: "12 min read",
    likes: 1890,
  },
  {
    id: "14",
    title: "Psychology for Designers: Peak-End Rule",
    summary: "How to design memorable experiences by focusing on the most intense moments and the final interaction.",
    content: `
      <p>Users don't remember every second of their experience. They remember the peak and the end. Lean how to use this cognitive bias to your advantage.</p>
    `,
    category: "Inspiration",
    author: "Elena Rossi",
    authorId: "elena_rossi",
    date: "Mar 10, 2024",
    imageUrl: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&q=80&w=2070",
    readTime: "9 min read",
    likes: 3567,
  },
  {
    id: "15",
    title: "Crafting the Perfect Design Case Study",
    summary: "Stop building galleries of pretty pictures. Start building stories that get you hired at top-tier design studios.",
    content: `
      <p>A great case study is a problem-solving narrative. We break down the structure of case studies that actually convert into job offers.</p>
    `,
    category: "Career",
    author: "Marcus Aurelius",
    authorId: "marcus_aurelius",
    date: "Mar 5, 2024",
    imageUrl: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=2070",
    readTime: "11 min read",
    likes: 2781,
  },
  {
    id: "16",
    title: "Quantum Computing: The Next Frontier",
    summary: "How quantum leaps are set to redefine computational power and cybersecurity in the next decade.",
    content: `<p>Quantum computing is no longer science fiction. It's becoming a tangible reality that will revolutionize everything from drug discovery to financial modeling.</p>`,
    category: "Tech",
    author: "Elena Rossi",
    authorId: "elena_rossi",
    date: "Mar 1, 2024",
    imageUrl: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=2070",
    readTime: "10 min read",
    likes: 5621,
  },
  {
    id: "17",
    title: "The Emotional Power of Sports Rivalries",
    summary: "A deep dive into why traditional sport rivalries are seeing a massive resurgence in viewership.",
    content: `<p>Fans are returning to the roots of sports competition. The emotional connection to long-standing rivalries is proving stronger than ever in the digital age.</p>`,
    category: "Sports",
    author: "James Chen",
    authorId: "james_chen",
    date: "Feb 25, 2024",
    imageUrl: "https://images.unsplash.com/photo-1504450758481-7338eba7524a?auto=format&fit=crop&q=80&w=2069",
    readTime: "8 min read",
    likes: 3102,
  },
  {
    id: "18",
    title: "Entertainment Algorithms and Discovery",
    summary: "How giants are pivoting layouts and algorithms to keep users engaged longer with premium content.",
    content: `<p>The landscape of entertainment is shifting. Platforms are no longer just competing on content, but on the very interface of discovery.</p>`,
    category: "Entertainment",
    author: "Sarah Jenkins",
    authorId: "sarah_jenkins",
    date: "Feb 20, 2024",
    imageUrl: "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80&w=2059",
    readTime: "11 min read",
    likes: 4210,
  },
  {
    id: "19",
    title: "Major Tech Consolidation in Silicon Valley",
    summary: "The implications of today's surprise acquisition and what it means for the future of the open web.",
    content: `<p>This morning's news sent shockwaves through the industry. We break down the winners and losers in this massive tech consolidation.</p>`,
    category: "News",
    author: "David Miller",
    authorId: "david_miller",
    date: "Feb 15, 2024",
    imageUrl: "https://images.unsplash.com/photo-1504711331083-9c895941bf81?auto=format&fit=crop&q=80&w=2070",
    readTime: "5 min read",
    likes: 12450,
  },
  {
    id: "20",
    title: "Innovation Corner: Tech Highlights 2024",
    summary: "From foldable screens to smart glasses, these are the tech innovations that will define the year.",
    content: `<p>The pace of hardware innovation is accelerating. We've curated a list of the most promising gadgets that are actually shipping this year.</p>`,
    category: "Tech",
    author: "Marcus Aurelius",
    authorId: "marcus_aurelius",
    date: "Feb 10, 2024",
    imageUrl: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=2070",
    readTime: "13 min read",
    likes: 2103,
  }
];
