import React, { Component } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const SignupSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(4, 'Too Short!')
    .max(10, 'Too Long!')
    .required('Required'),
  lastName: Yup.string()
    .min(4, 'Too Short!')
    .max(10, 'Too Long!')
    .required('Required'),
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
});

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Common Errors with Form Errors</h1>

        <ol>
          <li>Forms suck!</li>
          <li>They suck more if done incorrectly</li>
          <li>Our projects are heavy on forms.</li>
          <li>Browser provides very little and ugly defaults</li>
        </ol>

        <h2>Browser defaults example</h2>

        <form>
          <p>
            <label for="n1">How old are you?</label>
            <input type="text" inputmode='numeric' min="12" max="120" step="1" id="n1" name="age" pattern="\d+" required />
          </p>
          <p>
            <label for="t1">What's your favorite fruit?<abbr title="This field is mandatory">*</abbr></label>
            <input type="text" id="t1" name="fruit" list="l1" required
              pattern="[Bb]anana|[Cc]herry|[Aa]pple|[Ss]trawberry|[Ll]emon|[Oo]range" />
            <datalist id="l1">
              <option>Banana</option>
              <option>Cherry</option>
              <option>Apple</option>
              <option>Strawberry</option>
              <option>Lemon</option>
              <option>Orange</option>
            </datalist>
          </p>
          <p>
            <label for="t2">What's your e-mail?</label>
            <input type="email" id="t2" name="email" required />
          </p>
          <p>
            <label for="t3">Leave a short message</label>
            <textarea id="t3" name="msg" maxlength='5' maxlength="140" rows="5"></textarea>
          </p>
          <p>
            <button>Submit</button>
          </p>
        </form>

        <ol>
          <li>
            Ugly Styling (not customizable).
          </li>
          <li>
            Only show errors after submitting.
          </li>
          <li>
            Only the first error (even if there are multiple)
          </li>
          <li>
            Only on modern browsers.
          </li>
        </ol>


        <h2>Error 1: You are not really testing them, even if you kind of are</h2>

        <ul>
          <li>If users are not actively filling fields, what are we testing in reality?</li>
          <li>If all it takes to get a form correctly filled is find the nearest hot-spot, you are ignoring the "Messy Middle" experiencep.</li>
          <li>It's simply impossible to test with low-fidelity prototypes (no, Invision is not high-fidelity when it comes to forms)</li>
        </ul>



        <h2>Error 2: Where to show the error</h2>

        <div style={{ marginTop: '5rem' }}>
          <img src='http://uxmovement.com/wp-content/uploads/2018/04/error_message-comparison.png' />
        </div>
        <div style={{ marginTop: '5rem' }}>
          <img src='http://uxmovement.com/wp-content/uploads/2018/04/error_message-preference.png' />
        </div>
        <div style={{ marginTop: '5rem' }}>
          <img src='http://uxmovement.com/wp-content/uploads/2018/04/error_message-right.png' />
        </div>
        <div style={{ marginTop: '5rem' }}>
          <img src='http://uxmovement.com/wp-content/uploads/2018/04/error_message-left.png' />
        </div>
        <div style={{ marginTop: '5rem' }}>
          <img src='http://uxmovement.com/wp-content/uploads/2018/04/error_message-above.png' />
        </div>
        <div style={{ marginTop: '5rem' }}>
          <img src='http://uxmovement.com/wp-content/uploads/2018/04/error_message-below.png' />
        </div>

        <h2>Error 3: When to show the error?</h2>

        <h3>Show if the user tries to submit the form</h3>

        <Formik
          initialValues={{
            firstName: '',
            lastName: '',
            email: '',
          }}
          validationSchema={SignupSchema}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            setFieldTouched
          }) => (
              <Form>
                <div>
                  <div>
                    <label htmlFor='firstName'>Firstname</label>
                    <small>(required, min: 4, max: 10)</small>
                  </div>
                  <input
                    type='text'
                    onChange={(event) => {
                      handleChange(event);
                      setFieldTouched(event.target.name, true);
                    }}
                    onBlur={handleBlur}
                    name="firstName"
                    id='firstName'
                  />
                  {errors.firstName && touched.firstName ? (
                    <small className='error'>{errors.firstName}</small>
                  ) : null}
                </div>


                <div>
                  <div>
                    <label htmlFor='lastName'>Lastname</label>
                    <small>(required, min: 4, max: 10)</small>
                  </div>

                  <input
                    type='text'
                    onChange={(event) => {
                      handleChange(event);
                      setFieldTouched(event.target.name, true);
                    }}
                    onBlur={handleBlur}
                    name="lastName"
                    id='lastName'
                  />
                  {errors.lastName && touched.lastName ? (
                    <small className='error'>{errors.lastName}</small>
                  ) : null}
                </div>

                <div>
                  <div>
                    <label htmlFor='email'>Email</label>
                    <small>(valid email)</small>
                  </div>
                  <input
                    type='email'
                    onChange={(event) => {
                      handleChange(event);
                      setFieldTouched(event.target.name, true);
                    }}
                    onBlur={handleBlur}
                    name="email"
                    id='email'
                  />
                  {errors.email && touched.email ? <small className='error'>{errors.email}</small> : null}
                </div>

                <div>
                  <button type="submit">Submit</button>
                </div>
              </Form>
            )}
        </Formik>

        <h3>Show when typing</h3>

        <Formik
          initialValues={{
            firstName: '',
            lastName: '',
            email: '',
          }}
          validationSchema={SignupSchema}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            setFieldTouched
          }) => (
              <Form>
                <div>
                  <div>
                    <label htmlFor='firstName'>Firstname</label>
                    <small>(required, min: 4, max: 10)</small>
                  </div>
                  <input
                    type='text'
                    onChange={(event) => {
                      handleChange(event);
                      setFieldTouched(event.target.name, true);
                    }}
                    onBlur={handleBlur}
                    name="firstName"
                    id='firstName'
                  />
                  {errors.firstName && touched.firstName ? (
                    <small className='error'>{errors.firstName}</small>
                  ) : null}
                </div>


                <div>
                  <div>
                    <label htmlFor='lastName'>Lastname</label>
                    <small>(required, min: 4, max: 10)</small>
                  </div>

                  <input
                    type='text'
                    onChange={(event) => {
                      handleChange(event);
                      setFieldTouched(event.target.name, true);
                    }}
                    onBlur={handleBlur}
                    name="lastName"
                    id='lastName'
                  />
                  {errors.lastName && touched.lastName ? (
                    <small className='error'>{errors.lastName}</small>
                  ) : null}
                </div>

                <div>
                  <div>
                    <label htmlFor='email'>Email</label>
                    <small>(valid email)</small>
                  </div>
                  <input
                    type='email'
                    onChange={(event) => {
                      handleChange(event);
                      setFieldTouched(event.target.name, true);
                    }}
                    onBlur={handleBlur}
                    name="email"
                    id='email'
                  />
                  {errors.email && touched.email ? <small className='error'>{errors.email}</small> : null}
                </div>

                <div>
                  <button type="submit">Submit</button>
                </div>
              </Form>
            )}
        </Formik>


        <h3>Show when leaving the field</h3>

        <Formik
          initialValues={{
            firstName: '',
            lastName: '',
            email: '',
          }}
          validationSchema={SignupSchema}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            setFieldTouched
          }) => (
              <Form>
                <div>
                  <div>
                    <label htmlFor='firstName'>Firstname</label>
                    <small>(required, min: 4, max: 10)</small>
                  </div>
                  <input
                    type='text'
                    onChange={(event) => {
                      handleChange(event);
                      setFieldTouched(event.target.name, true);
                    }}
                    onBlur={handleBlur}
                    name="firstName"
                    id='firstName'
                  />
                  {errors.firstName && touched.firstName ? (
                    <small className='error'>{errors.firstName}</small>
                  ) : null}
                </div>


                <div>
                  <div>
                    <label htmlFor='lastName'>Lastname</label>
                    <small>(required, min: 4, max: 10)</small>
                  </div>

                  <input
                    type='text'
                    onChange={(event) => {
                      handleChange(event);
                      setFieldTouched(event.target.name, true);
                    }}
                    onBlur={handleBlur}
                    name="lastName"
                    id='lastName'
                  />
                  {errors.lastName && touched.lastName ? (
                    <small className='error'>{errors.lastName}</small>
                  ) : null}
                </div>

                <div>
                  <div>
                    <label htmlFor='email'>Email</label>
                    <small>(valid email)</small>
                  </div>
                  <input
                    type='email'
                    onChange={(event) => {
                      handleChange(event);
                      setFieldTouched(event.target.name, true);
                    }}
                    onBlur={handleBlur}
                    name="email"
                    id='email'
                  />
                  {errors.email && touched.email ? <small className='error'>{errors.email}</small> : null}
                </div>

                <div>
                  <button type="submit">Submit</button>
                </div>
              </Form>
            )}
        </Formik>




        <h3>My two cents (trigger for discussion):</h3>
        <ol>
          <li>
            it depends on the validation rule
            <ul>
              <li><strong>required:</strong> when leaving the field</li>
              <li>
                <strong>min:</strong> wait a little for the user to stop typing
              </li>
              <li>
                <strong>max:</strong> as soon as limit is reached
              </li>
              <li>
                <strong>email:</strong> wait a little for the user to stop typing
              </li>
              <li>
                <strong>email already exists:</strong> as soon as we know of it (we need to ask the backend)
              </li>
            </ul>
          </li>
          <li>
            show when submitting (and show all)
          </li>
          <li>
            scroll to first error (if it's not within the screen)
          </li>
        </ol>
      </div>
    );
  }
}

export default App;
