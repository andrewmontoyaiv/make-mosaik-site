import EleventyVitePlugin from "@11ty/eleventy-plugin-vite";
import tailwindcss from "@tailwindcss/vite";
import pluginNavigation from "@11ty/eleventy-navigation";
import pluginRss from "@11ty/eleventy-plugin-rss";
import sitemap from "@quasibit/eleventy-plugin-sitemap";

export default function (eleventyConfig) {
  eleventyConfig.addPlugin(EleventyVitePlugin, {
    viteOptions: {
      plugins: [
        tailwindcss(),
      ],
    },
  });
  eleventyConfig.addPlugin(pluginNavigation);
  eleventyConfig.addPlugin(pluginRss);

  eleventyConfig.addPlugin(sitemap, {
    sitemap: {
      hostname: "https://makemosaik.com",
    },
  });

  eleventyConfig.addPassthroughCopy("src/assets/css");
  eleventyConfig.addPassthroughCopy("src/assets/js");
  eleventyConfig.addPassthroughCopy("src/assets/images");


  eleventyConfig.addPassthroughCopy({
    public: "/",
  });
  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data",
    },
    templateFormats: ["njk", "md", "html"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };

}