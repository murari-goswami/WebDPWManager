import { Injectable } from '@angular/core';
import {ConstantService} from './constant-service.service';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {MasterField, MasterType} from './host-list/shared/host.model';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class MasterService {

  constructor(private constantService: ConstantService, private http: Http) { }

  getMasterType(masterTypeId: number): Observable<MasterType> {
    const masterType = this.http
      .get(`${this.constantService.API_ENDPOINT}/master/type/${masterTypeId}`, this.getHeaders())
      .map(data => toMasterType(data.json()))
      .catch(handleGetMasterTypeError);

    return masterType;
  }

  getMasterFields(masterTypeId: number): Observable<MasterField[]> {
    const masterFields =
      this.http.get(`${this.constantService.API_ENDPOINT}/master/fields/${masterTypeId}`, this.getHeaders())
        .map(data => toMasterField(data.json()))
        .catch(handleFieldsRetrieveError);
    return masterFields;
  }

  getSingleMasterField(fieldId: number): Observable<MasterField> {
    const masterFields =
      this.http.get(`${this.constantService.API_ENDPOINT}/master/field/${fieldId}`, this.getHeaders())
        .map(data => toMasterField(data.json()))
        .catch(handleFieldsRetrieveError);
      return masterFields[0];
  }

  private getHeaders() {
    const headers = new Headers();
    headers.append('accept', 'application/json');

    return headers;
  }
}

function toMasterType(r: any): MasterType {
  const masterType = <MasterType>({
    masterTypeId: r.masterTypeId,
    masterLabel: r.masterLabel
  });
  return masterType;
}

function toMasterField(r: any): MasterField {
  const masterField = <MasterField>({
    fieldId: r.fieldId,
    fieldName: r.fieldName,
    fieldDescription: r.fieldDescription
  });
  return masterField;
}

function handleGetMasterTypeError(error: any) {
  const errorDesc = error.message || 'No error description is available';
  const errorMsg = `An error occurred while retrieving master type info: ${errorDesc}`
  return Observable.throw(errorMsg);
}

function handleFieldsRetrieveError(error: any) {
  const errorDesc = error.message || 'No error description is available';
  const errorMsg = `An error occurred while retrieving master field info: ${errorDesc}`
  return Observable.throw(errorMsg);
}