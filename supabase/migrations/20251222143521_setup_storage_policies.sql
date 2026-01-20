/*
  # Storage Policies Setup

  1. Storage Buckets
    - `portfolio-images` - Profile and general portfolio images
    - `project-images` - Project screenshots and images
    - `achievement-images` - Achievement and certification images

  2. Security
    - Public read access for all image buckets
    - Authenticated users can upload, update, and delete images
*/

-- Portfolio images policies
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname = 'storage' AND tablename = 'objects' AND policyname = 'Public read access for portfolio images'
  ) THEN
    CREATE POLICY "Public read access for portfolio images"
    ON storage.objects FOR SELECT
    TO public
    USING (bucket_id = 'portfolio-images');
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname = 'storage' AND tablename = 'objects' AND policyname = 'Authenticated users can upload portfolio images'
  ) THEN
    CREATE POLICY "Authenticated users can upload portfolio images"
    ON storage.objects FOR INSERT
    TO authenticated
    WITH CHECK (bucket_id = 'portfolio-images');
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname = 'storage' AND tablename = 'objects' AND policyname = 'Authenticated users can update portfolio images'
  ) THEN
    CREATE POLICY "Authenticated users can update portfolio images"
    ON storage.objects FOR UPDATE
    TO authenticated
    USING (bucket_id = 'portfolio-images');
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname = 'storage' AND tablename = 'objects' AND policyname = 'Authenticated users can delete portfolio images'
  ) THEN
    CREATE POLICY "Authenticated users can delete portfolio images"
    ON storage.objects FOR DELETE
    TO authenticated
    USING (bucket_id = 'portfolio-images');
  END IF;
END $$;

-- Project images policies
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname = 'storage' AND tablename = 'objects' AND policyname = 'Public read access for project images'
  ) THEN
    CREATE POLICY "Public read access for project images"
    ON storage.objects FOR SELECT
    TO public
    USING (bucket_id = 'project-images');
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname = 'storage' AND tablename = 'objects' AND policyname = 'Authenticated users can upload project images'
  ) THEN
    CREATE POLICY "Authenticated users can upload project images"
    ON storage.objects FOR INSERT
    TO authenticated
    WITH CHECK (bucket_id = 'project-images');
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname = 'storage' AND tablename = 'objects' AND policyname = 'Authenticated users can update project images'
  ) THEN
    CREATE POLICY "Authenticated users can update project images"
    ON storage.objects FOR UPDATE
    TO authenticated
    USING (bucket_id = 'project-images');
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname = 'storage' AND tablename = 'objects' AND policyname = 'Authenticated users can delete project images'
  ) THEN
    CREATE POLICY "Authenticated users can delete project images"
    ON storage.objects FOR DELETE
    TO authenticated
    USING (bucket_id = 'project-images');
  END IF;
END $$;

-- Achievement images policies
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname = 'storage' AND tablename = 'objects' AND policyname = 'Public read access for achievement images'
  ) THEN
    CREATE POLICY "Public read access for achievement images"
    ON storage.objects FOR SELECT
    TO public
    USING (bucket_id = 'achievement-images');
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname = 'storage' AND tablename = 'objects' AND policyname = 'Authenticated users can upload achievement images'
  ) THEN
    CREATE POLICY "Authenticated users can upload achievement images"
    ON storage.objects FOR INSERT
    TO authenticated
    WITH CHECK (bucket_id = 'achievement-images');
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname = 'storage' AND tablename = 'objects' AND policyname = 'Authenticated users can update achievement images'
  ) THEN
    CREATE POLICY "Authenticated users can update achievement images"
    ON storage.objects FOR UPDATE
    TO authenticated
    USING (bucket_id = 'achievement-images');
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname = 'storage' AND tablename = 'objects' AND policyname = 'Authenticated users can delete achievement images'
  ) THEN
    CREATE POLICY "Authenticated users can delete achievement images"
    ON storage.objects FOR DELETE
    TO authenticated
    USING (bucket_id = 'achievement-images');
  END IF;
END $$;