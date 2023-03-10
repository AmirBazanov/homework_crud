-- CreateTable
CREATE TABLE "genres" (
    "genre_id" BIGSERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "genres_pkey" PRIMARY KEY ("genre_id")
);

-- CreateTable
CREATE TABLE "movies" (
    "movie_id" BIGSERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "production_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "movies_pkey" PRIMARY KEY ("movie_id")
);

-- CreateTable
CREATE TABLE "_genresTomovies" (
    "A" BIGINT NOT NULL,
    "B" BIGINT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "genres_name_key" ON "genres"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_genresTomovies_AB_unique" ON "_genresTomovies"("A", "B");

-- CreateIndex
CREATE INDEX "_genresTomovies_B_index" ON "_genresTomovies"("B");

-- AddForeignKey
ALTER TABLE "_genresTomovies" ADD CONSTRAINT "_genresTomovies_A_fkey" FOREIGN KEY ("A") REFERENCES "genres"("genre_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_genresTomovies" ADD CONSTRAINT "_genresTomovies_B_fkey" FOREIGN KEY ("B") REFERENCES "movies"("movie_id") ON DELETE CASCADE ON UPDATE CASCADE;
