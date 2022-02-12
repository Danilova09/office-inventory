create schema nazik_danilova_laba collate utf8_general_ci;
use nazik_danilova_laba;

create table categories
(
    id          int auto_increment,
    title       VARCHAR(100) not null,
    description TEXT         null,
    constraint categories_pk
        primary key (id)
);

create table places
(
    id          int auto_increment,
    title       VARCHAR(100) not null,
    description TEXT         null,
    constraint places_pk
        primary key (id)
);

create table items
(
    id          int auto_increment,
    category_id int          not null,
    place_id    int          not null,
    title       VARCHAR(100) not null,
    description TEXT         null,
    image       VARCHAR(31)  null,
    constraint items_pk
        primary key (id),
    constraint items_categories_id_fk
        foreign key (category_id) references categories (id),
    constraint items_places_id_fk
        foreign key (place_id) references places (id)
);

insert into categories (id, title)
values  (1, 'Furniture'),
        (2, 'Computer equipment'),
        (3, 'Appliances');


insert into places (id, title, description)
values  (1, 'Room 300', 'This room has air-conditioner'),
        (2, 'Garden', 'Nice place to have a walk'),
        (3, 'Room 120', 'for coding'),
        (4, 'Gaming zone', 'only for zoomers');

insert into items (id, title, description, category_id, place_id)
values  (1, 'Laptop', 'Pretty old', 1, 3),
        (2, 'Printer', 'to standard-size, 8.5" by 11" sheets of paper', 2, 1),
        (3, 'Chair', 'especially for one person', 1, 1),
        (4, 'Table', 'furniture with a flat top surface', 2, 2),
        (5, 'Stationery', 'only pens', 3, 1);