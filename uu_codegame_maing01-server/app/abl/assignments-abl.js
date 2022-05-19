"use strict";
// FIXME JR: smaž nepoužitý requiry
const Path = require("path");
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../api/errors/assignments-error.js");
const crypto = require("node:crypto");
// FIXME JR: překlep. Klidně to pojmenuje validation-helper, nebo dto-validation nebo tak něco.
const LocalValidaionHelper = require("../components/Local-validation-helper");

// FIXME JR: zapni si eslint, pak si k tomu zapni eslint autofix a oprav ten bambilion warningů
// na špatné zarovnání

const WARNINGS = {
  createUnsupportedKeys: {
    code: `${Errors.CreateAssignment.UC_CODE}unsupportedKeys`,
  },
  getFullAssignmentUnsupportedKeys: {
    code: `${Errors.GetFullAssignment.UC_CODE}unsupportedKeys`,
  }
};

class AssignmentsAbl {

  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao("assignments");
  }

  // FIXME JR: obecný problém u všeho -> standardem UAFu je že cesta k cmd je "entita/usecase",
  // ty to ale máš "entita/useCaseEntity", tzn. není to assignment/getFullAssignment, ale jen assignment/get
  // fixni to pls všude, ať dodržujeme patterny
  async getFullAssignment(uri, dtoIn) {
    let uuAppErrorMap = LocalValidaionHelper.validate(uri, dtoIn);

    let dtoOut = { uuAppErrorMap };

    try {
      let fullAssignment = await this.dao.getOne(dtoIn.id);

      let usersStats = await DaoFactory.getDao("users").getOne(dtoIn.userId);

      let partsToShow = [];
      fullAssignment.partsCo = fullAssignment.parts.length;

      for (let index in fullAssignment.parts) {

        if (parseInt(index) === 0) {
          partsToShow.push(fullAssignment.parts[index]);
          continue;
        }

        if (!usersStats.completedParts.includes(fullAssignment.parts[index - 1].id)) {
          break;
        }

        partsToShow.push(fullAssignment.parts[index]);
      }

      fullAssignment.parts = partsToShow;
      dtoOut.assignment = fullAssignment;

      // FIXME JR: tohle sem přece nepatří :)
    } catch (e) {
      throw new Errors.GetFullAssignment.InvalidDtoIn({ cause: e });
    }

    return dtoOut;
  }

  // FIXME JR: opět, projdi si nepoužité proměnné. Tady ale pak uri využiješ btw
  async getAssignments(uri, dtoIn) {
    let assignments = {};

    // FIXME JR: u všech dao metod musíme dodržovat rozdělení podle awidu, v podstatě vše systémový potřebuje
    // na sobě mít i klíč awid. Opět UAF pattern, jde o architekturu multitenantů,
    // https://www.techtarget.com/whatis/definition/multi-tenancy
    try {
      assignments = await this.dao.getAll();
    } catch (e) {
      // FIXME JR: ale ale ale :)
      // 1) nedělej catch kolem Dao metod, to je nadbytečný a kromě specifických usecasů to nemá vůbec smysl
      // 2) a už rozhodně nikdy nedělej catch (e) return (e), protože tím tu výjimku zamlčíš v podstatě.
      //    ani throw e nemá smysl, protože tím jen prasíš backtrace. Takže tady vůbec nemusíš mít try catch
      return e;
    }

    let dtoOut = assignments.itemList;

    return dtoOut;
  }

  async createAssignment(uri, dtoIn) {
    let uuAppErrorMap = LocalValidaionHelper.validate(uri, dtoIn);

    // FIXME JR: takže vše má alespoň jednu část? pokud ano, je potřeba to naznačit do validace,
    // tzn. array(shape(...), 1, null)
    dtoIn.parts = dtoIn.parts.map(x => {
      return {
        ...x,
        id: crypto.randomUUID()
      };
    });

    try {
      await this.dao.create(dtoIn);
    } catch (e) {
      throw new Errors.CreateAssignment.InvalidDtoIn({ cause: e });
    }

    let dtoOut = {
      assignment: { ...dtoIn },
      uuAppErrorMap
    };

    return dtoOut;
  }

}

module.exports = new AssignmentsAbl();
