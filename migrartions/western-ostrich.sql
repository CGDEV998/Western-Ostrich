CREATE DATABASE western_ostrich;
-- You can decide what the your loca password is
CREATE USER 'west_o' WITH PASSWORD 'password';
GRANT ALL PRIVILEGES ON DATABASE western_ostrich TO west_o;

CREATE SEQUENCE user_id_seq;

CREATE TABLE users (
  id INTEGER NOT NULL DEFAULT nextval('user_id_seq'::regclass) CONSTRAINT users_id_pk PRIMARY KEY,
  first_name CHARACTER VARYING(45) NOT NULL,
  last_name CHARACTER VARYING(45) NOT NULL,
  email CHARACTER VARYING(50),
  create_date DATE DEFAULT ('now'::text)::DATE NOT NULL,
  last_update timestamp without time zone DEFAULT now(),
  activebool BOOLEAN DEFAULT FALSE NOT NULL
);

CREATE TYPE MPAA_RATING AS ENUM (
  'G',
  'PG',
  'PG-13',
  'R',
  'NC-17'
);

CREATE TABLE media (
  id INTEGER NOT NULL DEFAULT nextval('user_id_seq'::regclass) CONSTRAINT media_id_pk PRIMARY KEY,
  title CHARACTER VARYING(256) NOT NULL,
  description TEXT,
  release_year SMALLINT,
  length SMALLINT,
  rating MPAA_RATING DEFAULT 'G'::MPAA_RATING,
  last_update TIMESTAMP WITHOUT TIME ZONE DEFAULT now() NOT NULL,
  special_features TEXT[],
  fulltext tsvector NOT NULL
);

CREATE TABLE users_watched  (
  user_id INTEGER REFERENCES users(id),
  media_id INTEGER REFERENCES media(id),
  added_at TIMESTAMP WITHOUT TIME ZONE DEFAULT now() NOT NULL
);

CREATE TABLE users_to_watch (
  user_id INTEGER REFERENCES users(id),
  media_id INTEGER REFERENCES media(id),
  added_at TIMESTAMP WITHOUT TIME ZONE DEFAULT now() NOT NULL
);

CREATE TABLE users_recommended (
  user_to INTEGER REFERENCES users(id),
  user_from INTEGER REFERENCES users(id),
  media_id INTEGER REFERENCES media(id),
  added_at TIMESTAMP WITHOUT TIME ZONE DEFAULT now() NOT NULL,
  accecpted BOOLEAN
);
