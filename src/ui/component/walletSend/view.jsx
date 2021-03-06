// @flow
import React from 'react';
import * as MODALS from 'constants/modal_types';
import Button from 'component/button';
import { Form, FormField } from 'component/common/form';
import { Formik } from 'formik';
import { validateSendTx } from 'util/form-validation';

type DraftTransaction = {
  address: string,
  amount: ?number, // So we can use a placeholder in the input
};

type Props = {
  openModal: (id: string, { address: string, amount: number }) => void,
  balance: number,
};

class WalletSend extends React.PureComponent<Props> {
  constructor() {
    super();

    (this: any).handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(values: DraftTransaction) {
    const { openModal } = this.props;
    const { address, amount } = values;
    if (amount && address) {
      const modalProps = { address, amount };
      openModal(MODALS.CONFIRM_TRANSACTION, modalProps);
    }
  }

  render() {
    const { balance } = this.props;

    return (
      <section className="card card--section">
        <header className="card__header">
          <h2 className="card__title">{__('Send Credits')}</h2>
          <p className="card__subtitle">{__('Send LBC to your friends or favorite creators')}</p>
        </header>

        <Formik
          initialValues={{
            address: '',
            amount: '',
          }}
          onSubmit={this.handleSubmit}
          validate={validateSendTx}
          render={({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <div className="card__content">
                <fieldset-group class="fieldset-group--smushed">
                  <FormField
                    type="number"
                    name="amount"
                    label={__('Amount')}
                    postfix={__('LBC')}
                    className="form-field--price-amount"
                    affixClass="form-field--fix-no-height"
                    min="0"
                    step="any"
                    placeholder="12.34"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.amount}
                  />

                  <FormField
                    type="text"
                    name="address"
                    placeholder="bbFxRyXXXXXXXXXXXZD8nE7XTLUxYnddTs"
                    className="form-field--address"
                    label={__('Recipient address')}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.address}
                  />
                </fieldset-group>
              </div>
              <div className="card__actions">
                <Button
                  button="primary"
                  type="submit"
                  label={__('Send')}
                  disabled={
                    !values.address ||
                    !!Object.keys(errors).length ||
                    !(parseFloat(values.amount) > 0.0) ||
                    parseFloat(values.amount) === balance
                  }
                />
                {!!Object.keys(errors).length && (
                  <span className="error-text">
                    {(!!values.address && touched.address && errors.address) ||
                      (!!values.amount && touched.amount && errors.amount) ||
                      (values.amount === balance &&
                        __('Decrease amount to account for transaction fee')) ||
                      (values.amount > balance && __('Not enough credits'))}
                  </span>
                )}
              </div>
            </Form>
          )}
        />
      </section>
    );
  }
}

export default WalletSend;
