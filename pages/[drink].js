import WhiteScreenPage from "../components/WhiteScreenPage";
import BlackScreenPage from "../components/BlackScreenPage";
import { createClient } from "contentful";

const whiteScreens = ["whisky", "cocktail"];
const blackScreens = ["tequila", "beer"];

export default function DrinkPage({ drink, content }) {
  if (whiteScreens.includes(drink)) {
    return <WhiteScreenPage drink={drink} content={content} />;
  } else if (blackScreens.includes(drink)) {
    return <BlackScreenPage drink={drink} content={content} />;
  } else {
    return <div>404 - Page Not Found</div>;
  }
}

export async function getStaticPaths() {
  return {
    paths: [
      { params: { drink: "whisky" } },
      { params: { drink: "cocktail" } },
      { params: { drink: "tequila" } },
      { params: { drink: "beer" } },
    ],
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const { drink } = context.params;
  let content = null;

  try {
    const client = createClient({
      space: process.env.CONTENTFUL_SPACE_ID,
      accessToken: process.env.CONTENTFUL_ACCESS_KEY,
    });
    let contentType = null;
    let textField = null;
    if (drink === "beer") {
      contentType = "subSectionWhatsYourBeer";
      textField = "Sub Section - What's Your Beer?";
    } else if (drink === "tequila") {
      contentType = "subSectionWhatsYourTequila";
      textField = "Sub Section - What's Your Tequila?";
    } else if (drink === "whisky") {
      contentType = "subSectionWhatsYourWhisky";
      textField = "Sub Section - What's Your Whisky?";
    } else if (drink === "cocktail") {
      contentType = "subSectionWhatsYourCocktail";
      textField = "Sub Section - What's Your Cocktail?";
    }
    if (contentType && textField) {
      const entries = await client.getEntries({
        content_type: contentType,
        "fields.text": textField,
      });
      content = entries.items[0]?.fields || null;
    }
  } catch (error) {
    console.error("Error fetching content from Contentful:", error);
  }

  return {
    props: { drink, content },
    revalidate: 10,
  };
}
