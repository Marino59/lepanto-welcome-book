import { type SchemaTypeDefinition } from 'sanity'
import { houseInfoType } from './schemaTypes/houseInfoType'
import { restaurantType } from './schemaTypes/restaurantType'
import { facilityType } from './schemaTypes/facilityType'
import { emergencyNumberType } from './schemaTypes/emergencyNumberType'
import { sightseeingType } from './schemaTypes/sightseeingType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [houseInfoType, restaurantType, facilityType, emergencyNumberType, sightseeingType],
}
