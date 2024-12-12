-- Create a new storage bucket for task images
INSERT INTO storage.buckets (id, name, public)
VALUES ('task-images', 'task-images', true);

-- Allow authenticated users to upload images
CREATE POLICY "Allow authenticated users to upload task images"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'task-images');

-- Allow public access to task images
CREATE POLICY "Allow public access to task images"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'task-images');