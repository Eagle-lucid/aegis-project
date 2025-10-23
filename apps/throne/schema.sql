-- Project Aegis - Throne Database Schema
   -- Run this in your Supabase SQL Editor
   
   -- Create treasury table
   CREATE TABLE treasury (
     id INTEGER PRIMARY KEY,
     total DECIMAL NOT NULL,
     marketing DECIMAL NOT NULL,
     rd DECIMAL NOT NULL,
     infrastructure DECIMAL NOT NULL,
     updated_at TIMESTAMPTZ DEFAULT NOW()
   );
   
   -- Insert initial data
   INSERT INTO treasury (id, total, marketing, rd, infrastructure)
   VALUES (1, 84250, 37913, 21063, 25275);
   
   -- Enable real-time updates
   ALTER PUBLICATION supabase_realtime ADD TABLE treasury;
   
   -- Verify setup
   SELECT * FROM treasury WHERE id = 1;