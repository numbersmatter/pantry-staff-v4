import { db } from "~/lib/database/firestore.server";

let getCurrentPeriod = async (programId: string) => {
  const servicePeriod = await db.service_periods.getLastServicePeriod(
    programId
  );
  return servicePeriod;
};

let getProgramData = async (programId: string) => {
  const program = await db.programs.read(programId);
  if (!program) {
    throw new Error("Program not found");
  }

  const programArea = await db.program_areas.read(program.program_area_id);
  if (!programArea) {
    throw new Error("Program Area not found");
  }

  return {
    ...program,
    program_area: programArea.name,
  };
};

export { getCurrentPeriod, getProgramData };
