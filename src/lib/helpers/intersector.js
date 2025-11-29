import intersect from "@turf/intersect";
import bboxPolygon from "@turf/bbox-polygon";
import area from "@turf/area";
import { featureCollection, polygon, multiPolygon, point} from "@turf/turf";
import booleanPointInPolygon from '@turf/boolean-point-in-polygon';

export const intersector = (footprint, extent) => {
    const extentPolygon = bboxPolygon(extent);
    const intersection = intersect(featureCollection([polygon(footprint.coordinates), extentPolygon]));
    if(intersection == null) {
        return 0;
    } else {
        return area(intersection)/area(extentPolygon);
    }
}

export const insideChecker = (ll, poly) => {
    const pt = point(ll);
    const pol = polygon(poly[0].coordinates);
    return booleanPointInPolygon(pt, pol);
  };