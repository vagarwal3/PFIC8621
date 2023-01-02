import { assert } from "chai";
import {ShareBlock} from "../ShareBlock"

describe('ShareBlock', () => {
    it('ShareBlock initialization is not correct', () => {
        let shareBlock:ShareBlock =  new ShareBlock(2022,1,new Date(2022,0,1),1,new Date(2022,0,1),1);
        
        assert.equal(shareBlock.);
        assert.equal(cal.daysInMonth(2,2024),29);
    })
});
