CREATE TABLE CHARACTERS(
    id serial primary key,
    "name" varchar,
    "level" varchar,
    "class" varchar,
    "armor_class" integer,
    "initiative_modifier" integer default 0,
    "max_hitpoints" integer default 0
    );