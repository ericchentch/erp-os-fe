import { Input } from '@/components'
import { useTranslation } from '@/hooks'
import { inputStyles } from '@/inventory'
import { DictionaryKey } from '@/types'
import { DeleteDictionaryPopup } from './DeleteDictionaryPopup'

interface ILanguageTable {
  dictionaryList: DictionaryKey
  edit?: boolean
  handleChangeState: Function
  setLetCallList: Function
  updateStoreLanguage: Function
}

export const LanguageTable = ({
  dictionaryList,
  edit,
  handleChangeState,
  setLetCallList,
  updateStoreLanguage,
}: ILanguageTable) => {
  const labelKey = useTranslation('labelKey')
  const labelDict = useTranslation('labelDict')

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, minmax(min-content, 1fr))',
      }}
    >
      <div style={{ gridColumn: 'span 1 / span 1' }}>{labelKey}</div>
      <div style={{ gridColumn: 'span 1 / span 1' }}>{labelDict}</div>
      <hr style={{ gridColumn: 'span 2 / span 2', margin: '10px 0px' }} />
      {Object.keys(dictionaryList).map((dictionaryKey) => {
        if (edit)
          return (
            <>
              <div
                style={{
                  gridColumn: 'span 1 / span 1',
                  display: 'flex',
                  gap: 5,
                  alignItems: 'center',
                }}
              >
                <Input
                  style={{ width: '100%' }}
                  value={dictionaryKey}
                  readOnly
                  {...inputStyles({})}
                />
                <DeleteDictionaryPopup
                  updateStoreLanguage={updateStoreLanguage}
                  dictionaryKey={dictionaryKey}
                  setLetCallList={setLetCallList}
                />
              </div>
              <div style={{ gridColumn: 'span 1 / span 1' }}>
                <Input
                  style={{ width: '100%' }}
                  value={dictionaryList[dictionaryKey]}
                  onChange={(event) => {
                    handleChangeState({
                      ...dictionaryList,
                      [dictionaryKey]: event.currentTarget.value,
                    })
                  }}
                  {...inputStyles({})}
                />
              </div>
            </>
          )
        return (
          <>
            <div
              style={{
                gridColumn: 'span 1 / span 1',
                display: 'flex',
                gap: 5,
                alignItems: 'center',
              }}
            >
              <span>{dictionaryKey}</span>
              <DeleteDictionaryPopup
                updateStoreLanguage={updateStoreLanguage}
                dictionaryKey={dictionaryKey}
                setLetCallList={setLetCallList}
              />
            </div>
            <div style={{ gridColumn: 'span 1 / span 1' }}>{dictionaryList[dictionaryKey]}</div>
            {handleChangeState}
          </>
        )
      })}
    </div>
  )
}
