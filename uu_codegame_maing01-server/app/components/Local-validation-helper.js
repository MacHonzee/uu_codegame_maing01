const { Validator } = require("uu_appg01_server").Validation;
const { ValidationHelper: UuValidationHelper } = require("uu_appg01_server").AppServer;
const CodeGameMainUseCaseError = require("../api/errors/codegame-main-use-case-error");

// FIXME JR: název souboru by měl odpovídat třídě ideálně, takže buď přejmenuj soubor,
// nebo přejmenuje třídu na něco jiného, např. DtoValidator nebo ValidationComponent nebo nevím co,
// a k tomu pak i soubor tedy
class ValidationHelper {
  constructor() {
    this.validator = Validator.load();
  }

  validate(uri, dtoIn) {
    const dtoInType = this._getValidationTypeCode(uri);
    const warningCode = this._getWarningCode(uri);
    const error = this._getError(uri);

    let validationResult = this.validator.validate(dtoInType, dtoIn);
    return UuValidationHelper.processValidationResult(dtoIn, validationResult, warningCode, error);
  }

  addWarning() {
    UuValidationHelper.addWarning(...arguments);
  }

  _concatUseCase(uri, suffix) {
    let ucPart = uri
      .getUseCase()
      .split("/")
      .reduce((type, part, i) => (i === 0 ? type + part : type + this._capitalize(part)), "");
    return ucPart + suffix;
  }

  _capitalize(string) {
    return `${string[0].toUpperCase()}${string.slice(1)}`;
  }

  _getWarningCode(uri) {
    return this._concatUseCase(uri, "/unsupportedKeys");
  }

  _getValidationTypeCode(uri) {
    return this._concatUseCase(uri, "DtoInType");
  }

  _getError(uri) {
    let errorCode = this._concatUseCase(uri, "/invalidDtoIn");
    return class extends CodeGameMainUseCaseError {
      constructor() {
        super(...arguments);
        this.code = errorCode;
        this.message = "DtoIn is not valid.";
      }
    };
  }
}

module.exports = new ValidationHelper();
