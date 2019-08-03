
SELECT pg_catalog.set_config('search_path', 'public', false);


CREATE TABLE public.bids (
    id integer NOT NULL,
    seller_id integer NOT NULL,
    buyer_id integer NOT NULL,
    p_date_time timestamp with time zone,
    details json,
    total_bid integer,
    contact_name text NOT NULL,
    status character varying(255),
    created_at timestamp with time zone,
    updated_at timestamp with time zone
);

CREATE SEQUENCE public.bids_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public.bids_id_seq OWNED BY public.bids.id;

CREATE TABLE public.items (
    id integer NOT NULL,
    seller_id integer NOT NULL,
    details json NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone
);

CREATE SEQUENCE public.items_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public.items_id_seq OWNED BY public.items.id;

CREATE TABLE public.user_details (
    id integer NOT NULL,
    city character varying(255) NOT NULL,
    pin_code integer NOT NULL,
    persona character varying(255) NOT NULL,
    address text NOT NULL,
    mob_no bigint,
    alt_mob_no bigint,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    lat double precision NOT NULL,
    long double precision NOT NULL,
    email_id character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    name character varying(255) NOT NULL,
    "loginId" character varying(255) NOT NULL
);

CREATE SEQUENCE public.user_details_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public.user_details_id_seq OWNED BY public.user_details.id;

CREATE TABLE public.user_meta (
    id integer NOT NULL,
    mobile_no bigint NOT NULL,
    email_id character varying(255),
    password character varying(255),
    name character varying(255) NOT NULL,
    persona character varying(255) NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone
);

CREATE SEQUENCE public.user_meta_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public.user_meta_id_seq OWNED BY public.user_meta.id;

CREATE TABLE public.user_otp (
    id integer NOT NULL,
    otp bigint NOT NULL,
    email_id character varying(255) NOT NULL,
    mobile_no bigint NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone
);

CREATE SEQUENCE public.user_otp_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public.user_otp_id_seq OWNED BY public.user_otp.id;

ALTER TABLE ONLY public.bids ALTER COLUMN id SET DEFAULT nextval('public.bids_id_seq'::regclass);

ALTER TABLE ONLY public.items ALTER COLUMN id SET DEFAULT nextval('public.items_id_seq'::regclass);

ALTER TABLE ONLY public.user_details ALTER COLUMN id SET DEFAULT nextval('public.user_details_id_seq'::regclass);

ALTER TABLE ONLY public.user_meta ALTER COLUMN id SET DEFAULT nextval('public.user_meta_id_seq'::regclass);

ALTER TABLE ONLY public.user_otp ALTER COLUMN id SET DEFAULT nextval('public.user_otp_id_seq'::regclass);

ALTER TABLE ONLY public.bids
    ADD CONSTRAINT bids_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.items
    ADD CONSTRAINT items_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.user_details
    ADD CONSTRAINT user_details_email_id_key UNIQUE (email_id);

ALTER TABLE ONLY public.user_details
    ADD CONSTRAINT "user_details_loginId_key" UNIQUE ("loginId");

ALTER TABLE ONLY public.user_details
    ADD CONSTRAINT user_details_mob_no_key UNIQUE (mob_no);

ALTER TABLE ONLY public.user_details
    ADD CONSTRAINT user_details_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.user_meta
    ADD CONSTRAINT user_meta_email_id_key UNIQUE (email_id);

ALTER TABLE ONLY public.user_meta
    ADD CONSTRAINT user_meta_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.user_otp
    ADD CONSTRAINT user_otp_pkey PRIMARY KEY (id);

