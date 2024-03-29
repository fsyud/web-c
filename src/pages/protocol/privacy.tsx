import React from 'react';
import styles from './index.less';

const Privacy: React.FC<{}> = () => {
  return (
    <div className={styles.protocol}>
      <h1>星空用户隐私政策</h1>
      <p>更新日期：2021年9月1日</p>
      <p>
        ·
        我们会遵循隐私政策收集、使用您的信息，但不会仅因您同意本隐私政策而采用强制捆绑的方式一揽子收集个人信息。
      </p>
      <b className="bold">1.1 注册、登录</b>
      <p>
        a.
        当您注册、登录星空及相关服务时，您可以通过手机号创建帐号，并且您可以完善相关的网络身份识别信息（头像、昵称、密码），收集这些信息是为了帮助您完成注册。您还可以根据自身需求选择填写职位、公司、简介、博客地址来完善您的信息。
      </p>
      <p>
        b.
        您也可以使用第三方帐号登录并使用，您将授权我们获取您在第三方平台注册的公开信息（头像、昵称以及您授权的其他信息），用于与星空帐号绑定，使您可以直接登录并使用本产品和相关服务。
      </p>
      <b className="bold">1.2 内容浏览</b>
      <p>
        星空可能会根据您在星空内订阅的标签、话题和关注的用户，向您推荐更感兴趣的信息，为实现这一功能，我们可能会收集必要的日志信息，我们不会使用来源于第三方的数据以实现上述功能。
      </p>
      <b className="bold">1.3 发布与互动</b>
      <p>
        <b className="bold">1.3.1 信息发布</b>
      </p>
      <p>
        a.您发布内容、评论、提问或回答时，我们将收集您发布的信息，并展示您的昵称、头像、发布内容。
      </p>
      <p>
        b.您使用上传图片或者更换头像功能时，我们会请求您授权
        <b className="bold">
          <u>
            相机、相册权限。您如果拒绝授权提供，将无法使用此功能，但不影响您正常使用星空的其他功能。
          </u>
        </b>
      </p>
      <p>
        c.用户因使用我们的产品或者服务而被我们收集的信息，例如其他用户发布的信息中可能含有您的部分信息（如：在评论、留言、发布图文中涉及到与您相关的信息）。
      </p>
      <b className="bold">1.3.2 互动交流</b>
      <p>
        您主动关注您感兴趣的帐号、话题并与之进行互动，进行浏览、评论、收藏、点赞或分享内容时，我们会收集您关注的帐号，并向您展示您关注帐号发布内容。
      </p>
      <b className="bold">1.4 搜索</b>
      <p>
        您使用“星空”的搜索服务时，我们会收集您的搜索关键字信息、日志记录。为了提供高效的搜索服务，部分前述信息会暂时存储在您的本地存储设备之中，并可向您展示搜索结果内容、搜索历史记录。
      </p>
      <p>
        如果您认为我们不正确地处理了您的个人信息、或您希望取消学生认证，请您通过文末的联系方式及时联系我们处理。{' '}
      </p>
      <b className="bold">1.5 其他</b>
      <p>
        a.在您分享或接收被分享的信息等情形下，我们需要访问您的剪切板，读取其中包含的链接以实现分享等功能或服务。
      </p>
      <p>
        b.在使用第三方帐号进行登录时，可能需要将实现登录所必需的信息在剪切板中写入与读取。这些信息仅供实现登录相关的目的所使用，不会收集您的隐私信息。
      </p>
      <b className="bold">1.6 安全运行</b>
      <p>
        <b className="bold">1.6.1 安全保障功能</b>
        <p>
          我们致力于为您提供安全、可信的产品与使用环境，提供优质而可靠的服务是我们的核心目标。为实现安全保障功能所收集的信息是
          <b className="bold">
            <u>必要信息</u>
          </b>
          。
        </p>
      </p>
      <p>
        <strong>谢谢您的理解！</strong>
      </p>
    </div>
  );
};

export default Privacy;
