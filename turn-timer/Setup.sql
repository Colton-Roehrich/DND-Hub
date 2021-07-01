
---     ____                            _                    _____     _     _      
--- || / ___|__ _ _ __ ___  _ __   __ _(_) __ _ _ __  ||    |_   _|_ _| |__ | | ___ 
---   | |   / _` | '_ ` _ \| '_ \ / _` | |/ _` | '_ \         | |/ _` | '_ \| |/ _ \
---   | |__| (_| | | | | | | |_) | (_| | | (_| | | | |        | | (_| | |_) | |  __/
---    \____\__,_|_| |_| |_| .__/ \__,_|_|\__, |_| |_|        |_|\__,_|_.__/|_|\___|
---                        |_|            |___/                                
CREATE TABLE "campaign"(
    id serial primary key,
    "name" varchar
    );
INSERT INTO "campaign"("name") Values('ExampleCampaign');






---         ___ _                        _____     _     _
---    || / ___| | __ _ ___ __  ||      |_   _|_ _| |__ | | ___ 
---      | |   | |/ _` / __/ __|          | |/ _` | '_ \| |/ _ \
---      | |___| | (_| \__ \__ \          | | (_| | |_) | |  __/
---       \____|_|\__,_|___/___/          |_|\__,_|_.__/|_|\___|


CREATE TABLE "class"(
    id serial primary key,
    "classname" varchar
    );
    
INSERT INTO "class"("classname")
VALUES
('Barbarian'),
('Wizard'),
('Rogue'),
('Monk'),
('Druid'),
('Paladin'),
('Sorcerer'),
('Warlock');






---      ____ _                          _                   _____     _     _      
--- ||  / ___| |__   __ _ _ __ __ _  ___| |_ ___ _ __ ||    |_   _|_ _| |__ | | ___ 
---    | |   | '_ \ / _` | '__/ _` |/ __| __/ _ \ '__|        | |/ _` | '_ \| |/ _ \
---    | |___| | | | (_| | | | (_| | (__| ||  __/ |           | | (_| | |_) | |  __/
---     \____|_| |_|\__,_|_|  \__,_|\___|\__\___|_|           |_|\__,_|_.__/|_|\___|
---                                                                             


CREATE TABLE "character"(
    id serial primary key,
    "nickname" varchar,
    "name" varchar,
    "level" integer default 0,
    "class_id" integer not null,
    "armor_class" integer default 0,
    "initiative_modifier" integer default 0,
    "max_hitpoints" integer default 0,
    "campaign_id" integer not null,
	constraint fk_class  FOREIGN KEY ("class_id") references "class"(id) ON DELETE CASCADE,
	constraint fk_campaign  FOREIGN KEY ("campaign_id") references "campaign"(id) ON DELETE CASCADE
    );
	
	
	INSERT INTO "character"("nickname","name","level","class_id","armor_class","initiative_modifier","max_hitpoints", "campaign_id") VALUES ('example','example_character', 11, 1, 15, 2, 113, 1);

