export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "evident.ai",
    url: "https://yourdomain.com",
    logo: "https://yourdomain.com/images/logo.png",
    description: "Continuous compliance & evidence automation for high-growth startups.",
    sameAs: [
      "https://twitter.com/evidentai",
      "https://linkedin.com/company/evidentai",
      "https://github.com/evidentai",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      email: "hello@evident.ai",
    },
  };
}

export function generateWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "evident.ai",
    url: "https://yourdomain.com",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://yourdomain.com/resources/blog?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };
}

export function generateBlogPostSchema(post: {
  title: string;
  description: string;
  date: string;
  author: string;
  slug: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Person",
      name: post.author,
    },
    publisher: {
      "@type": "Organization",
      name: "evident.ai",
      logo: {
        "@type": "ImageObject",
        url: "https://yourdomain.com/images/logo.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://yourdomain.com/resources/blog/${post.slug}`,
    },
  };
}

export function generateFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function generateBreadcrumbSchema(
  items: { name: string; url: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
