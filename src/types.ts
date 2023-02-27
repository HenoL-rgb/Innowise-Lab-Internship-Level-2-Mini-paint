import { Timestamp } from "firebase/firestore";

export type FigureType = {
  figure: string;
  color: string;
  mode: string;
  width: number;
};

export type ShapeType = {
  line: {
    start: {
      x: number;
      y: number;
    };
    end: {
      x: number;
      y: number;
    };
  };
  figure: string;
  color: string;
  mode: string;
  width: number;
};

export type ThemeType = {
  currentTheme: string;
  light: {
    main: string;
    header: {
      bg: string;
      font: string;
      buttons: string;
      logo: string;
    };
    sidebar: {
      buttons: string;
    };
  };
  dark: {
    main: string;
    header: {
      bg: string;
      font: string;
      buttons: string;
      logo: string;
    };
    sidebar: {
      buttons: string;
    };
  };
};

export type PaletteType = {
  main: string;
  header: {
    bg: string;
    font: string;
    buttons: string;
    logo: string;
  };
  sidebar: {
    buttons: string;
  };
};

export type UserType = {
  user: string;
  title: string;
  imageRef: string;
  createdAt: Timestamp;
};

export type PostType = UserType & {
  image: string;
};

export type SideBarProps = {
  handleClearClick: () => void;
  handleSave: (title: string) => void;
  theme: any;
};

export type PostProps = {
  theme: any;
  name: string;
  title: string;
  image: string;
};

export type HeaderProps = {
  theme: PaletteType;
};

export type formPropsType = {
  handleClick: (email: string, password: string) => void;
};
