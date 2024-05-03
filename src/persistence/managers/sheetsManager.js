import { sheetModel } from "../models/sheet.model.js";
import { projectModel } from "../models/project.model.js";

//console.log(divideArray(db, collaborators.length))

export default class sheetsManager {
  async getSheets() {
    try {
      //Filter by user role, to get all sheets if your role is admin or only your sheet if you are a collaborator
      const db = await sheetModel.find();
      console.log("pasa por getSheets", db);
      return {
        success: true,
        message: "Sheets got successfully",
        sheets: db,
      };
    } catch (error) {
      console.log("error del manager", error);
    }
  }

  async createSheets(excelAndProject) {
    //el front va a enviar {excel: [], projectId: "837483024", user: "dshfkasfdsa", collaborators}

    try {
      //Get sheets in database for the same project
      const db = await sheetModel.find({
        project: excelAndProject.projectId,
      });

      console.log("db", db);
      console.log("excelAndProject", excelAndProject);

      if (db.length === 0) {
        //Divide array
        const newArraysLength = Math.ceil(
          excelAndProject.excel.length / excelAndProject.collaborators.length
        );
        console.log("newArraysLength", newArraysLength);
        const newSheets = [];

        for (let i = 0; i < excelAndProject.collaborators.length; i++) {
          const copy = [...excelAndProject.excel];

          const newSheetForBack = {
            updatedAt: new Date(),
            collaborator: excelAndProject.collaborators[i]._id,
            excel: copy.splice(i * newArraysLength, newArraysLength * (i + 1)),
            project: excelAndProject.projectId,
            updatedBy: excelAndProject.user,
          };

          newSheets.push(newSheetForBack);

          const newSheetsFromDb = await sheetModel.create(newSheetForBack);
        }
        console.log("newSheets", newSheets);

        return {
          message: "Sheets created successfully",
          success: true,
          newSheets: newSheets,
        };
      } else {
        let newDb = [];

        db.forEach((el) => {
          newDb = [...el.excel];
        });

        const dnisInDb = newDb.map((el) => el.DNI);
        console.log("newDb", newDb);
        console.log("dnisInDb", dnisInDb);

        excelAndProject.excel.forEach((el) => {
          if (!dnisInDb.includes(el.DNI)) {
            dnisInDb.push(el.DNI);
            newDb.push(el);
          }
        });

        //Deletes in Mongo Atlas the documents wichs projects have id = excelAndProject.projectId
        await sheetModel.deleteMany({project: excelAndProject.projectId})
        //Divide array
        const newArraysLength = Math.ceil(
          newDb.length / excelAndProject.collaborators.length
        );
        console.log("newArraysLength", newArraysLength);
        const newSheets = [];

        for (let i = 0; i < excelAndProject.collaborators.length; i++) {
          const copy = [...newDb];

          const newSheetForBack = {
            updatedAt: new Date(),
            collaborator: excelAndProject.collaborators[i]._id,
            excel: copy.splice(i * newArraysLength, newArraysLength * (i + 1)),
            project: excelAndProject.projectId,
            updatedBy: excelAndProject.user,
          };

          newSheets.push(newSheetForBack);

        

       // await sheetModel.findByIdAndDelete(db[0]._id);
      
        const newSheetsFromDb = await sheetModel.create(newSheetForBack);
      }
      console.log('newSheets', newSheets)
        return {
          message: "Sheets created successfully",
          success: true,
          newSheets: newSheets,
        };
      }
    } catch (error) {
      console.log("error del manager", error);
    }
  }

  async updateSheet(updatedSheet) {
    try {
      //After collaborator phones a patient
    } catch (error) {
      console.log("error del manager", error);
    }
  }
}
