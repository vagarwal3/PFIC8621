export class USPersonStatus
{
    IsUSPersonSinceBirth: boolean;
    USPersonSinceTaxYear:number|null;
    constructor(IsUSPersonSinceBirth: boolean,usPersonSinceTaxYear:number|null)
    {
        this.IsUSPersonSinceBirth=IsUSPersonSinceBirth;
        this.USPersonSinceTaxYear = usPersonSinceTaxYear;
    }
}