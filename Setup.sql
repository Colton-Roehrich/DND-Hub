---      ____ _                          _                   _____     _     _      
--- ||  / ___| |__   __ _ _ __ __ _  ___| |_ ___ _ __ ||    |_   _|_ _| |__ | | ___ 
---    | |   | '_ \ / _` | '__/ _` |/ __| __/ _ \ '__|        | |/ _` | '_ \| |/ _ \
---    | |___| | | | (_| | | | (_| | (__| ||  __/ |           | | (_| | |_) | |  __/
---     \____|_| |_|\__,_|_|  \__,_|\___|\__\___|_|           |_|\__,_|_.__/|_|\___|
---                                                                             


CREATE TABLE "character"(
    id serial primary key,
    "nickname" varchar,
    "armor_class" integer default 0,
    "current_hitpoints" integer default 0,
    "dead" boolean default false,
    );


--    ____                _           _     _____     _     _      
--   / ___|___  _ __ ___ | |__   __ _| |_  |_   _|_ _| |__ | | ___ 
--  | |   / _ \| '_ ` _ \| '_ \ / _` | __|   | |/ _` | '_ \| |/ _ \
--  | |__| (_) | | | | | | |_) | (_| | |_    | | (_| | |_) | |  __/
--   \____\___/|_| |_| |_|_.__/ \__,_|\__|   |_|\__,_|_.__/|_|\___|
                                                                


CREATE TABLE "combat"(
    id serial primary key,
    "character_id" varchar,
    "initiative"  integer,
    "has_initiative" boolean default false,
    "extra_time_pool" integer default 0,
    "status_effect" varchar default '',
    "status_effect_time" integer default 0,
   CONSTRAINT fk_character
      FOREIGN KEY(character_id) 
	  REFERENCES "character"(id)
      ON DELETE CASCADE
    );
