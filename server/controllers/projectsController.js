const db = require("../db");
const allowedStatuses = ["Planning", "In Progress", "On Hold", "Completed"];
const fields = "id, name, code, area, status, lead, description, created_at";

function validate(input) {
  const missing = ["name", "code", "area", "status", "lead"].filter((key) => !String(input[key] || "").trim());
  if (missing.length) return `Required fields missing: ${missing.join(", ")}.`;
  return allowedStatuses.includes(input.status) ? null : "Status is invalid.";
}
const values = (input) => ["name", "code", "area", "status", "lead", "description"].map((key) => String(input[key] || "").trim());

exports.list = async (req, res, next) => { try { const result = await db.query(`SELECT ${fields} FROM projects ORDER BY created_at DESC`); res.json(result.rows); } catch (error) { next(error); } };
exports.getById = async (req, res, next) => { try { const result = await db.query(`SELECT ${fields} FROM projects WHERE id = $1`, [req.params.id]); if (!result.rowCount) return res.status(404).json({ error: "Project not found." }); res.json(result.rows[0]); } catch (error) { next(error); } };
exports.create = async (req, res, next) => { const error = validate(req.body); if (error) return res.status(400).json({ error }); try { const result = await db.query(`INSERT INTO projects (name, code, area, status, lead, description) VALUES ($1, $2, $3, $4, $5, $6) RETURNING ${fields}`, values(req.body)); res.status(201).json(result.rows[0]); } catch (err) { if (err.code === "23505") return res.status(409).json({ error: "A project with this code already exists." }); next(err); } };
exports.update = async (req, res, next) => { const error = validate(req.body); if (error) return res.status(400).json({ error }); try { const result = await db.query(`UPDATE projects SET name=$1, code=$2, area=$3, status=$4, lead=$5, description=$6 WHERE id=$7 RETURNING ${fields}`, [...values(req.body), req.params.id]); if (!result.rowCount) return res.status(404).json({ error: "Project not found." }); res.json(result.rows[0]); } catch (err) { if (err.code === "23505") return res.status(409).json({ error: "A project with this code already exists." }); next(err); } };
exports.remove = async (req, res, next) => { try { const result = await db.query("DELETE FROM projects WHERE id = $1 RETURNING id", [req.params.id]); if (!result.rowCount) return res.status(404).json({ error: "Project not found." }); res.status(204).send(); } catch (error) { next(error); } };
