/*
 * Reglas:
 * El final de cada nivel debe ser el inicio del siguiente
*/

function createImage (src) {
  const image = new Image(0, 0);
  image.src = src;
  return image;
}

export const emojis = {
    '-': ' ',
    'O': createImage('./icons/tierra.png'),
    'X': createImage('./icons/roca.png'),
    'W': createImage('./icons/roca2.png'),
    'I': createImage('./icons/astronauta.png'),
    'S': createImage('./icons/satellite.png'),
    'PLAYER': createImage('./icons/cohete.png'),
    'BOMB_COLLISION': '💥',
    'GAME_OVER': '👾',
    'WIN': '🏆',
    'HEART':'❤️',
  };

  const maps = [];
  maps.push(`
    IXXWXXXXXX
    -XXXXXXXXX
    -XXXXXXXWX
    -XXXXWXXXX
    -XXXXXXXXX
    -XXXXXXXXX
    -XXXXWXXWX
    -XXXXXXWXX
    -XXWXXXXXX
    OXXXXWXXXW
  `);
maps.push(`
    O--XXXWWXX
    X--XWXXWXX
    XX----XXXW
    X--XX-XXXX
    X-XXX--XXX
    X-XWXX-XXX
    XX--XX--XX
    XX--XWX-XX
    XWXX---IXX
    XXXWXXXXXX
    `);
maps.push(`
    I-----XXXX
    XXXWX-XXXX
    XX----XXXX
    XX-XXWXWWX
    XX-----XXX
    XXXXXX-XWX
    XX-----XWX
    XX-XXWWXXX
    XX-----OXX
    XWWWXXXXXX
  `);
  maps.push(`
    OXXXXWWXXX
    ----XXXXWX
    -XX-XXWXXX
    -XX---X--I
    -XXX----XX
    -XXXX--XSX
    --------XX
    -XXXX-XXWX
    -XXXXXWXXX
    XXWXWXXXXX`
  );
  maps.push(`
  XXWXX--XX-
  ----XWX-XW
  -XX-XX-X-X
  ------X--O
  -XWX----X-
  X-XXX--XX-
  --X-----X-
  -XWWX-XWX-
  I--X--XXX-
  WX---X---X
  `);

  export {
    maps,
  };

