import MJTT from './processor/MJTT.processor'
import MJ302 from './processor/MJ302.processor'
import FLUXRP from './processor/FLUXRP.processor'
import FLUX302 from './processor/FLUX302.processor'
import WORKFLOW from './processor/WORKFLOW.processor'

export const processor = {
	...MJTT,
	...MJ302,
	...FLUX302,
	...FLUXRP,
	...WORKFLOW
}
