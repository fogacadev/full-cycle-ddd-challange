import Address from '../../value-object/address'
import Customer from '../../../customer/entity/customer'
import CustomerCreatedEvent from '../customer-created.event'
import SendEmailWhenCustomerAddressIsChangedHandler from './send-email-when-customer-address-is-changed-handler'
import SendEmailWhenCustomerIsCreatedHandler from './send-email-when-customer-is-created-handler'
import SendEmailAdminWhenCustomerIsCreatedHandler from './send-email-admin-when-customer-is-created-handler'

describe('Customer Handler Unit Tests', () => {
  let spyConsoleLog: any

  beforeEach(() => {
    spyConsoleLog = jest.spyOn(console, 'log')
  })

  afterEach(() => {
    spyConsoleLog.mockRestore()
  })

  test('Send Email When Customer Is Created Handler', () => {
    const customer = new Customer('1', 'Customer 1')
    const customerCreatedEvent = new CustomerCreatedEvent(customer)

    new SendEmailWhenCustomerIsCreatedHandler().handle(customerCreatedEvent)

    expect(spyConsoleLog).toHaveBeenCalledWith(
      'Esse é o primeiro console.log do evento: CustomerCreated'
    )
  })

  test('Send To Cloud When Customer Is Created Handler', () => {
    const customer = new Customer('777', 'Sr. Customer')
    const customerCreatedEvent = new CustomerCreatedEvent(customer)

    new SendEmailAdminWhenCustomerIsCreatedHandler().handle(customerCreatedEvent)

    expect(spyConsoleLog).toHaveBeenCalledWith(
      'Esse é o segundo console.log do evento: CustomerCreated'
    )
  })

  test('Send Email When Customer Address Is Changed Handler', () => {
    const customer = new Customer('777', 'Sr. Customer')
    const address = new Address('Rua: Sr. Dos Testes', 1313, '15500-190', 'Votuporanga')
    customer.changeAddress(address)
    const customerCreatedEvent = new CustomerCreatedEvent({
      id: customer.id,
      name: customer.name,
      address: customer.Address.toString(),
    })

    new SendEmailWhenCustomerAddressIsChangedHandler().handle(
      customerCreatedEvent
    )

    expect(spyConsoleLog).toHaveBeenCalledWith(
      `Endereço do cliente: ${customer.id}, ${
        customer.name
      } alterado: ${customer.Address.toString()}`
    )
  })
})