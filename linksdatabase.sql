CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

DROP TABLE IF EXISTS continenttable;

CREATE TABLE IF NOT EXISTS continenttable (
    con_id    uuid      DEFAULT uuid_generate_v4() PRIMARY KEY,
    con_name  varchar(100),
);

DROP TABLE IF EXISTS countrytable;

CREATE TABLE IF NOT EXISTS countrytable (
    cou_id    uuid      DEFAULT uuid_generate_v4() PRIMARY KEY,
    cou_name  varchar(100),
    con_id    uuid      FOREIGN KEY
);

DROP TABLE IF EXISTS linktable;

CREATE TABLE IF NOT EXISTS linktable (
    lin_id    uuid      DEFAULT uuid_generate_v4() PRIMARY KEY,
    lin_inst  varchar(100),
    lin_url   varchar(200),
    cou_id    uuid      FOREIGN KEY
);

INSERT INTO continenttable (con_name) VALUES
('asia'),
('europe'),
('oceania'),
('africa'),
('north america'),
('south america');

-- INSERT INTO countrytable (cou_name, con_id) VALUES
--
--
--
-- INSERT INTO linktable (lin_inst, lin_url, cou_id) VALUES
-- ( 'these are three default messages' ),
-- ( 'delivered from the server' ),
-- ( 'using a custom route' );
