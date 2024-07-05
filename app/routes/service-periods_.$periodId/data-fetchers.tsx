import { FamilyAppModel } from "~/lib/database/families/types";
import { db } from "~/lib/database/firestore.server";



let getPageData = async (periodId: string) => {
  const period = await db.service_periods.read(periodId);
  if (!period) throw new Error("Service period not found");

  let headerInfo = await getHeaderInfo(period.program_id);

  return { headerInfo };
}

async function getHeaderInfo(program_id: string) {
  const program = await db.programs.read(program_id);
  if (!program) throw new Error("Program not found");


  return {
    title: program.name,
  };
}




export { getPageData }