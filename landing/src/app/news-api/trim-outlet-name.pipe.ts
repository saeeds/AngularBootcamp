import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "trimOutletName"
})
export class TrimOutletNamePipe implements PipeTransform {
  transform(title: any, outletName: string): any {
    return title.replace(` - ${outletName}`, "");
  }
}
