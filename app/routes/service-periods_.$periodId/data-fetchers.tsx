import { FamilyAppModel } from "~/lib/database/families/types";
import { db } from "~/lib/database/firestore.server";



let getPageData = async (periodId: string) => {
  const period = await db.service_periods.read(periodId);
  if (!period) throw new Error("Service period not found");

  let programInfo = await getProgramInfo(period.program_id);

  let headerInfo = {
    title: programInfo.title,
    programArea: programInfo.programArea,
    service_period: period.name,
    period_description: period.description,
  };

  return { headerInfo };
}

async function getProgramInfo(program_id: string) {
  const program = await db.programs.read(program_id);
  if (!program) throw new Error("Program not found");


  return {
    title: program.name,
    programArea: "Food Pantry",
  };
}




export { getPageData }