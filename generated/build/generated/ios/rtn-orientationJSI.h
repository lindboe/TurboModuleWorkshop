/**
 * This code was generated by [react-native-codegen](https://www.npmjs.com/package/react-native-codegen).
 *
 * Do not edit this file as changes may cause incorrect behavior and will be lost
 * once the code is regenerated.
 *
 * @generated by codegen project: GenerateModuleH.js
 */

#pragma once

#include <ReactCommon/TurboModule.h>
#include <react/bridging/Bridging.h>

namespace facebook {
namespace react {

class JSI_EXPORT NativeOrientationCxxSpecJSI : public TurboModule {
protected:
  NativeOrientationCxxSpecJSI(std::shared_ptr<CallInvoker> jsInvoker);

public:
  

};

template <typename T>
class JSI_EXPORT NativeOrientationCxxSpec : public TurboModule {
public:
  jsi::Value get(jsi::Runtime &rt, const jsi::PropNameID &propName) override {
    return delegate_.get(rt, propName);
  }

protected:
  NativeOrientationCxxSpec(std::shared_ptr<CallInvoker> jsInvoker)
    : TurboModule("RTNOrientation", jsInvoker),
      delegate_(static_cast<T*>(this), jsInvoker) {}

private:
  class Delegate : public NativeOrientationCxxSpecJSI {
  public:
    Delegate(T *instance, std::shared_ptr<CallInvoker> jsInvoker) :
      NativeOrientationCxxSpecJSI(std::move(jsInvoker)), instance_(instance) {}

    

  private:
    T *instance_;
  };

  Delegate delegate_;
};

} // namespace react
} // namespace facebook
