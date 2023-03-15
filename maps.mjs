/*
 * Reglas:
 * El final de cada nivel debe ser el inicio del siguiente
*/

export const emojis = {
    '-': ' ',
    'O':'🌍',
    'X': '🪨',
    'I': '🧑‍🚀',
    'PLAYER': '🚀',
    'BOMB_COLLISION': '💥',
    'GAME_OVER': '👾',
    'WIN': '🏆',
    'HEART':'❤️',
  };

  const maps = [];
  maps.push(`
    IXXXXXXXXX
    -XXXXXXXXX
    -XXXXXXXXX
    -XXXXXXXXX
    -XXXXXXXXX
    -XXXXXXXXX
    -XXXXXXXXX
    -XXXXXXXXX
    -XXXXXXXXX
    OXXXXXXXXX
  `);
maps.push(`
    O--XXXXXXX
    X--XXXXXXX
    XX----XXXX
    X--XX-XXXX
    X-XXX--XXX
    X-XXXX-XXX
    XX--XX--XX
    XX--XXX-XX
    XXXX---IXX
    XXXXXXXXXX
    `);
maps.push(`
    I-----XXXX
    XXXXX-XXXX
    XX----XXXX
    XX-XXXXXXX
    XX-----XXX
    XXXXXX-XXX
    XX-----XXX
    XX-XXXXXXX
    XX-----OXX
    XXXXXXXXXX
  `);
  maps.push(`
    OXXXXXXXXX
    ----XXXXXX
    -XX-XXXXXX
    -XX---X--I
    -XXX----XX
    -XXXX--XXX
    --------XX
    -XXXX-XXXX
    -XXXXXXXXX
    XXXXXXXXXX`
  );
  maps.push(`
  XXXXX--XX-
  ----XXX-XX
  -XX-XX-X-X
  ------X--O
  -XXX----X-
  X-XXX--XX-
  --X-----X-
  -XXXX-XXX-
  I--X--XXX-
  XX---X---X
  `);

  export {
    maps,
  };

