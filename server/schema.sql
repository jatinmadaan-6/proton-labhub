-- Create the proton_labhub database, then run: psql -d proton_labhub -f schema.sql
CREATE TABLE IF NOT EXISTS projects (
  id SERIAL PRIMARY KEY,
  name VARCHAR(160) NOT NULL,
  code VARCHAR(40) NOT NULL UNIQUE,
  area VARCHAR(120) NOT NULL,
  status VARCHAR(20) NOT NULL CHECK (status IN ('Planning', 'In Progress', 'On Hold', 'Completed')),
  lead VARCHAR(120) NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
INSERT INTO projects (name, code, area, status, lead, description) VALUES
 ('Portable Vein Finder', 'PR-001', 'Medical Devices', 'In Progress', 'Dr. Mira Shah', 'Handheld imaging study for bedside venous access.'),
 ('Sleep Apnea Detection', 'PR-002', 'Health Monitoring', 'Planning', 'Dr. Daniel Kim', 'Signal-processing study for respiratory monitoring.'),
 ('Soil Nutrient Monitoring', 'PR-003', 'AgriTech', 'Completed', 'Dr. Asha Rao', 'Low-power sensing platform for field nutrient analysis.')
ON CONFLICT (code) DO NOTHING;
