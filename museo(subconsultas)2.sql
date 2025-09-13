create table character_dc (
	id binary(16) primary key default (UUID_TO_BIN(UUID())),
    nameChar varchar(50) not null,
	realName varchar(50) default 'Unknown'
);

create table power (
	id int auto_increment primary key,
	power VARCHAR(100) NOT NULL
);

CREATE TABLE characterxpowers (
    character_id BINARY(16) NOT NULL,
    power_id int,
    PRIMARY KEY (character_id, power_id),
    FOREIGN KEY (character_id) REFERENCES character_dc(id) ON DELETE CASCADE,
    FOREIGN KEY (power_id) REFERENCES power(id) ON DELETE CASCADE
);

select BIN_TO_UUID(c.id) as id, c.nameChar as character_name, c.realName as character_realName, GROUP_CONCAT(p.power SEPARATOR ', ') as powers
from character_dc c
join characterxpowers cxp
on c.id = cxp.character_id
join power p
on p.id = cxp.power_id
GROUP BY c.id, c.nameChar, c.realName;

select BIN_TO_UUID(id), nameChar, realName
from character_dc;

