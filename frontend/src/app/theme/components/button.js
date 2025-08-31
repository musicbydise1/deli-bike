import { ORANGE_COLOR, ORANGE_HOVER_COLOR } from '../colors';

// Button component theme
export const buttonTheme = {
  // Default styles for all buttons
  defaultProps: {
    size: 'md',
    radius: 'md',
    style: {
      textTransform: 'uppercase',
    },
  },

  // Custom variants
  variants: {
    // The primary variant (filled orange button)
    primary: {
      backgroundColor: ORANGE_COLOR,
      color: 'white',
      border: 'none',
      '&:hover': {
        backgroundColor: ORANGE_HOVER_COLOR,
      },
    },

    // The primary-outline variant (outlined orange button)
    'primary-outline': {
      border: `1px solid ${ORANGE_COLOR}`,
      color: ORANGE_COLOR,
      backgroundColor: 'transparent',
      '&:hover': {
        backgroundColor: 'rgba(255, 107, 0, 0.1)',
      },
    },

    // Override the default filled variant to use our orange color
    filled: {
      backgroundColor: ORANGE_COLOR,
      color: 'white',
      '&:hover': {
        backgroundColor: ORANGE_HOVER_COLOR,
      },
    },

    // Override the default outline variant to use our orange color
    outline: {
      border: `1px solid ${ORANGE_COLOR}`,
      color: ORANGE_COLOR,
      '&:hover': {
        backgroundColor: 'rgba(255, 107, 0, 0.1)',
      },
    },
  },
};
