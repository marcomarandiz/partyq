import Sequelize from 'sequelize';

const sequelize = new Sequelize('partyqdb', 'user', null, {
  host: 'localhost',
  dialect: 'postgres'
});

const room = sequelize.define('rooms', {
  room_id: {
    type: sequelize.INTEGER,
    field: 'id',
    primaryKey: true,
    autoIncrement: true,
    validate: {
      notNull: true
    }
  },
  owner: {
    type: sequelize.STRING,
    field: 'creator',
    validate: {
      notNull: true
    }
  },
  creation_date: {
    type: sequelize.DATE_ONLY,
    defaultValue: sequelize.NOW,
    field: 'creation_date',
    validate: {
      notNull: true
    }
  },
  name: {
    type: sequelize.STRING,
    unique: true,
    field: 'name',
    validate: {
      notNull: true
    }
  },
  expired: {
    type: sequelize.BOOLEAN,
    default: false,
    field: 'expired'
  }
});

const song = sequelize.define('songs', {
  song_id: {
    type: sequelize.INTEGER,
    field: 'sid',
    primaryKey: true,
    autoIncrement: true,
    validate: {
      notNull: true
    }
  },
  source: {
    type: sequelize.STRING,
    field: 'source',
    validate: {
      notNull: true
    }
  },
  title: {
    type: sequelize.STRING,
    field: 'title',
    validate: {
      notNull: true
    }
  },
  artist: {
    type: sequelize.STRING,
    field: 'artist',
    validate: {
      notNull: true
    }
  },
  duration: {
    type: sequelize.INTEGER,
    field: 'duration',
    validate: {
      notNull: true
    }
  },
  currentlyPlaying: {
    type: sequelize.BOOLEAN,
    field: 'current',
    validate: {
      notNull: true
    }
  },
  hasPlayed: {
    type: sequelize.BOOLEAN,
    field: 'playing',
    validate: {
      notNull: true
    }
  },
  upvotes: {
    type: sequelize.INTEGER,
    field: 'upvotes',
    validate: {
      notNull: true
    }
  },
  skipvotes: {
    type: sequelize.INTEGER,
    field: 'skipvotes',
    validate: {
      notNull: true
    }
  },
  room: {
    type: sequelize.ARRAY(room(room.id)),
    field: 'room'
  },
  date_added: {
    type: sequelize.DATE_ONLY,
    defaultValue: sequelize.NOW,
    field: 'date_added',
    validate: {
      notNull: true
    }
  }
});
