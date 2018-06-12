import {Injectable} from '@angular/core';
import {URL_CONSTANTS} from '../app.url';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class UploadServiceService {
    private mediaFilesUrl: string = URL_CONSTANTS.mediaFiles;

    constructor(private http: HttpClient) {
    }

    upload(fileToUpload: any) {
        const input = new FormData();
        input.append('file', fileToUpload);

        return this.http.post<any>(this.mediaFilesUrl, input);
    }

}
