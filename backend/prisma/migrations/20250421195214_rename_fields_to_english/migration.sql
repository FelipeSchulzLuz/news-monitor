-- CreateTable
CREATE TABLE "events" (
    "uuid" UUID NOT NULL,
    "cep" VARCHAR(255),
    "complement" VARCHAR(255),
    "number" INTEGER,
    "category" SMALLINT,
    "date" TIMESTAMP(6),
    "description" VARCHAR(255),

    CONSTRAINT "events_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "sales" (
    "uuid" UUID NOT NULL,
    "user_id" BIGINT,

    CONSTRAINT "sales_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "tickets" (
    "id" BIGSERIAL NOT NULL,
    "code" INTEGER NOT NULL,
    "sale_uuid" UUID,
    "ticket_types_id" BIGINT,

    CONSTRAINT "tickets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "type_ticket" (
    "id" BIGSERIAL NOT NULL,
    "definition" VARCHAR(255),
    "sector" VARCHAR(255),
    "total_available" INTEGER NOT NULL,
    "value" DOUBLE PRECISION,
    "event_uuid" UUID,

    CONSTRAINT "type_ticket_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" BIGSERIAL NOT NULL,
    "birthday" DATE,
    "cpf" VARCHAR(255),
    "email" VARCHAR(255),
    "name" VARCHAR(255),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "noticias" (
    "id" SERIAL NOT NULL,
    "title" TEXT,
    "url" TEXT NOT NULL,
    "publishedAt" TIMESTAMP(3),
    "source" TEXT,
    "keyword" TEXT NOT NULL,
    "image" TEXT,
    "description" TEXT,
    "content" TEXT,

    CONSTRAINT "noticias_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "noticias_url_key" ON "noticias"("url");

-- AddForeignKey
ALTER TABLE "sales" ADD CONSTRAINT "fk5bgaw8g0rrbqdvafq36g58smk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tickets" ADD CONSTRAINT "fk4i4q6p7mkidepeqs8yb45wtqr" FOREIGN KEY ("sale_uuid") REFERENCES "sales"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tickets" ADD CONSTRAINT "fk6fesbfansqcu9rya2gw6t8lgc" FOREIGN KEY ("ticket_types_id") REFERENCES "type_ticket"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "type_ticket" ADD CONSTRAINT "fkqyj5p7tqss385o8w1tdtbjrwi" FOREIGN KEY ("event_uuid") REFERENCES "events"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION;
