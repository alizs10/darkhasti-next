// @/app/lib/moment.ts

import moment from 'jalali-moment';
import "moment/locale/fa";

export default function momentFa(input?: moment.MomentInput) {
    return moment(input).locale("fa");
}