import React from 'react'
import FeeDiscount from './FeeDiscount'
import Duration from './Duration'
import {translateFeeType} from '../../utils/dict'
import {makeStyles} from '@material-ui/core'
import ecomp from '../../utils/enum-comp'
import {isDuration} from '../../utils/datetime'

const useStyles = makeStyles(() => ({
  sectionTitle: {
    fontStyle: 'italic'
  },
  sectionContent: {
    marginTop: 0,
    marginBottom: 0,
    paddingLeft: 20
  }
}))

const Fee = (props) => {
  const classes = useStyles()
  const {
    name,
    feeType,
    amount,
    balanceRate,
    transactionRate,
    accruedRate,
    accrualFrequency,
    currency,
    additionalValue,
    additionalInfo,
    additionalInfoUri,
    discounts
  } = props.fee
  return (
    <li>
      <div>
        {name}
        {!!amount && <span> - ${amount}</span>}
        {!!balanceRate && <span> - {(balanceRate * 100).toFixed(2)}%</span>}
        {!!transactionRate && <span> - {(transactionRate * 100).toFixed(2)}%</span>}
        {!!accruedRate && <span> - {(accruedRate * 100).toFixed(2)}%</span>}
        {!!accrualFrequency && <span> - <Duration prefix="every" value={accrualFrequency}/></span>}
      </div>
      <div>
        Fee Type - {translateFeeType(feeType)}
        {feeType === 'PERIODIC' && <span> - <Duration prefix="every" value={additionalValue}/></span>}

      </div>
      {!!currency && <div>Currency - {currency}</div>}
      {
        feeType !== 'PERIODIC' && !!additionalValue && 
        <div>
          {isDuration(additionalValue) ? <><Duration prefix="every" value={additionalValue}/></> : additionalValue}
        </div>}
      {!!additionalInfo && <div>{additionalInfo}</div>}
      {!!additionalInfoUri && <div><a href={additionalInfoUri} target='_blank' rel='noopener noreferrer'>More info</a></div>}
      {
        !!discounts && discounts.length > 0 &&
          <div>
            <div className={classes.sectionTitle}>Discounts:</div>
            <ul className={classes.sectionContent}>
              {discounts.sort((a, b)=>ecomp(a.discountType, b.discountType)).map(
                (discount, index) =><FeeDiscount key={index} discount={discount}/>)}
            </ul>
          </div>
      }
    </li>
  )
}

export default Fee
