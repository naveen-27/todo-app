import lightMobileBackground from "../images/bg-mobile-light.jpg";
import darkMobileBackground from "../images/bg-mobile-dark.jpg";
import lightDesktopBackground from "../images/bg-desktop-light.jpg";
import darkDesktopBackground from "../images/bg-desktop-dark.jpg";

const getBackgroundImage = (width, theme) => {
  const images = {
    light: {
      mobile: lightMobileBackground,
      desktop: lightDesktopBackground,
    },
    dark: {
      mobile: darkMobileBackground,
      desktop: darkDesktopBackground,
    },
  };

  const device = width > 600 ? "desktop" : "mobile";
  return images[theme][device];
};

export default getBackgroundImage;
