import {Injectable} from '@angular/core';
import {URL_CONSTANTS} from '../app.url';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class MediaFilesService {
    private mediaFilesUrl = URL_CONSTANTS.mediaFiles;

    constructor(private http: HttpClient) {
    }

    uploadFile(file: File) {
        let formData: FormData = new FormData();
        formData.append('file', file, file.name);
        let headers = new HttpHeaders();
        headers.append('Accept', 'application/json');
        let options = {headers: headers};
        // console.log(formData.);
        return this.http.post(this.mediaFilesUrl, formData, options).toPromise<any>();

    }
}
