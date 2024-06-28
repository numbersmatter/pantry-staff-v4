import { db } from "~/lib/database/firestore.server";

const getProgramsData = async () => {
  const programs = await db.programs.getAll();

  const programAreas = await db.program_areas.getAll();

  const programAreaOptions = programAreas.map((area) => ({
    value: area.id,
    label: area.name,
  }));

  const programsList = programs.map((program) => {
    return {
      id: program.id,
      name: program.name,
      program_area_name:
        programAreas.find((area) => area.id === program.program_area_id)
          ?.name ?? "Unknown",
    };
  });
  return { programsList, programAreaOptions, programs, programAreas };
};

export { getProgramsData };
