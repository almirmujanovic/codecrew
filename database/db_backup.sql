--
-- PostgreSQL database dump
--

-- Dumped from database version 16.2 (Debian 16.2-1.pgdg120+2)
-- Dumped by pg_dump version 16.2 (Debian 16.2-1.pgdg120+2)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


--
-- Name: project_type; Type: TYPE; Schema: public; Owner: admin
--

CREATE TYPE public.project_type AS ENUM (
    'Normal',
    'Interview'
);


ALTER TYPE public.project_type OWNER TO admin;

--
-- Name: update_modified_column(); Type: FUNCTION; Schema: public; Owner: admin
--

CREATE FUNCTION public.update_modified_column() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$;


ALTER FUNCTION public.update_modified_column() OWNER TO admin;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: languages; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.languages (
    id integer NOT NULL,
    name character varying(50) NOT NULL
);


ALTER TABLE public.languages OWNER TO admin;

--
-- Name: languages_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.languages_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.languages_id_seq OWNER TO admin;

--
-- Name: languages_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.languages_id_seq OWNED BY public.languages.id;


--
-- Name: project_users; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.project_users (
    user_id integer NOT NULL,
    role character varying(50),
    projects_id uuid
);


ALTER TABLE public.project_users OWNER TO admin;

--
-- Name: projects; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.projects (
    project_id uuid NOT NULL,
    name character varying(255) NOT NULL,
    description text,
    type character varying(50),
    duration interval,
    admin character varying(255),
    language_id integer
);


ALTER TABLE public.projects OWNER TO admin;

--
-- Name: users; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.users (
    user_id integer NOT NULL,
    username character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.users OWNER TO admin;

--
-- Name: users_user_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.users_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_user_id_seq OWNER TO admin;

--
-- Name: users_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.users_user_id_seq OWNED BY public.users.user_id;


--
-- Name: languages id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.languages ALTER COLUMN id SET DEFAULT nextval('public.languages_id_seq'::regclass);


--
-- Name: users user_id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.users ALTER COLUMN user_id SET DEFAULT nextval('public.users_user_id_seq'::regclass);


--
-- Data for Name: languages; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.languages (id, name) FROM stdin;
1	JavaScript
2	Typescript
3	Python
4	Java
5	C
6	C++
7	C#
\.




--
-- Name: languages_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.languages_id_seq', 7, true);


--
-- Name: users_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.users_user_id_seq', 3, true);


--
-- Name: languages languages_name_key; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.languages
    ADD CONSTRAINT languages_name_key UNIQUE (name);


--
-- Name: languages languages_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.languages
    ADD CONSTRAINT languages_pkey PRIMARY KEY (id);


--
-- Name: projects projects_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.projects
    ADD CONSTRAINT projects_pkey PRIMARY KEY (project_id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- Name: idx_users_email; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX idx_users_email ON public.users USING btree (email);


--
-- Name: users trg_users_update; Type: TRIGGER; Schema: public; Owner: admin
--

CREATE TRIGGER trg_users_update BEFORE UPDATE ON public.users FOR EACH ROW EXECUTE FUNCTION public.update_modified_column();


--
-- Name: projects fk_language; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.projects
    ADD CONSTRAINT fk_language FOREIGN KEY (language_id) REFERENCES public.languages(id);


--
-- Name: project_users fk_projects_id; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.project_users
    ADD CONSTRAINT fk_projects_id FOREIGN KEY (projects_id) REFERENCES public.projects(project_id);


--
-- Name: project_users project_users_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.project_users
    ADD CONSTRAINT project_users_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id);


--
-- PostgreSQL database dump complete
--

