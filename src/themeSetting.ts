export const themeSettings = {
  buttons: {
    default: "#fc6722",
    hover: "#ff5608",
    active: "#ff7b3e",
    color: "white",
  },

  backBtn: {
    default: "#857f7d",
    hover: "rgba(110, 110, 110, 1)",
    active: "#9e9e9e",
    color: "white",
  },

  day: {
    current: {
        bg: 'black',
        color: 'white',
        border: '1px solid rgba(0,0,0,0.1)'
    },

    weekDay: {
        bg: 'white',
        color: '#ff5608',
        border: '1px solid #ff5608',
    },

    default: {
        bg: 'white',
        color: 'black',
        border: '1px solid rgba(0,0,0,0.1)'
    }
  },

  app: {
    color: 'black',
    bg: 'white',
  },

  task: {
    completed: {
        textDecoration: 'line-through',
        bgColor: 'rgba(172, 172, 172, 0.1)',
        color: 'rgb(94, 94, 94)'
      },
      uncompleted: {
        textDecoration: 'none',
        bgColor: 'none',
        color: 'black',
    }
  }
};
