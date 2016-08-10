$ heroku pg:psql                                                           
> create table links (id serial, link varchar, text varchar);
> insert into "links" (link, text) values ('/', 'home');
